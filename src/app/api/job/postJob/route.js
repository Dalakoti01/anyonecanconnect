import { NextResponse } from "next/server";
import {getUserIdFromRequest} from "@/lib/getUserIdFromRequest";
import User from "@/models/userModels";
import Job from "@/models/jobModels";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();

  try {
    const ownerId = await getUserIdFromRequest(req);
    console.log("Owner ID:", ownerId);

    const owner = await User.findById(ownerId);
    if (!owner) {
      console.log("Owner Not Found");
      return NextResponse.json(
        {
          message: "Owner Not Found",
          success: false,
        },
        { status: 404 }
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

    if (
      !title ||
      !description ||
      !salary ||
      !duration ||
      !rank ||
      !applicationDeadline ||
      !budgetType ||
      !category ||
      !jobType
    ) {
      console.log("Missing fields");
      return NextResponse.json(
        {
          message: "Something is Missing",
          success: false,
        },
        { status: 400 }
      );
    }

    const job = await Job.create({
      title,
      description,
      duration,
      salary,
      rank,
      skills,
      owner: ownerId,
      applicationDeadline,
      budgetType,
      category,
      jobType,
    });

    if (!job) {
      return NextResponse.json(
        {
          message: "Job Not Created",
          success: false,
        },
        { status: 400 }
      );
    }

    owner.activeJobs.push(job._id);
    await owner.save();

    return NextResponse.json(
      {
        message: "Job Created Successfully",
        success: true,
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
