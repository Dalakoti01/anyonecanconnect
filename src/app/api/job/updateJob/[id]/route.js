import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Job from "@/models/jobModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // So we can use params synchronously


// Update Job handler
export async function POST(req, { params }) {
  try {
    await dbConnect();

    const jobId = params.id;
    const userId = await getUserIdFromRequest(req); // Handles both JWT and NextAuth users

    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json(
        { message: "Job not found", success: false },
        { status: 404 }
      );
    }

    if (job.owner.toString() !== userId.toString()) {
      return NextResponse.json(
        {
          message: "You are not authorized to update this job",
          success: false,
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      title,
      description,
      salary,
      duration,
      skills,
      rank,
      jobType,
      applicationDeadline,
      budgetType,
      category,
    } = body;

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        salary,
        duration,
        skills,
        rank,
        jobType,
        applicationDeadline,
        budgetType,
        category,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Job updated successfully",
        success: true,
        job: updatedJob,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Job Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
