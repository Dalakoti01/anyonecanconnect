import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import User from "@/models/userModels";
import Job from "@/models/jobModels";
import Message from "@/models/messageSchema";
import dbConnect from "@/lib/dbConnect";

export const runtime = "nodejs"; // To allow synchronous use of `params.id`

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "No Such User Found", success: false },
        { status: 404 }
      );
    }

    const jobId = params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json(
        { message: "No Such Job Exists", success: false },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, description, delivarables, salary, duration, budgetType } =
      body;

    if (
      !title ||
      !description ||
      !delivarables ||
      !salary ||
      !duration ||
      !budgetType
    ) {
      return NextResponse.json(
        { message: "Something is missing", success: false },
        { status: 400 }
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        salary,
        budgetType,
        delivarables,
        duration,
      },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { message: "Job Could not be updated", success: false },
        { status: 400 }
      );
    }

    const message = await Message.findOne({ projectBrief: jobId }).populate({
      path: "projectBrief",
    });

    if (!message) {
      return NextResponse.json(
        { message: "No such message found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Job Updated Successfully",
        success: true,
        job: updatedJob,
        populatedMessage: message,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
