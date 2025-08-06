import { NextResponse } from "next/server";
import {getUserIdFromRequest} from "@/lib/getUserIdFromRequest";
import Job from "@/models/jobModels";
import dbConnect from "@/lib/dbConnect";
import "@/models/applicationModel";

export async function GET(req) {
  await dbConnect();

  try {
    const ownerId = await getUserIdFromRequest(req);

    let jobs = await Job.find({ owner: ownerId, status: { $ne: "specific" } })
      .sort({ createdAt: -1 })
      .populate("owner")
      .populate({
        path: "application",
        populate: {
          path: "applicant.user",
          model: "User",
        },
      });

    if (!jobs || jobs.length === 0) {
      return NextResponse.json(
        {
          message: "No Job present at this moment",
          success: true,
          jobs: [],
        },
        { status: 200 }
      );
    }

    const now = new Date();

    const updatedJobs = await Promise.all(
      jobs.map(async (job) => {
        if (
          job.clientReviewDeadline &&
          job.clientReviewDeadline < now &&
          job.status !== "completed"
        ) {
          job.status = "completed";
          await job.save();
        }
        return job;
      })
    );

    return NextResponse.json(
      {
        message: "All the jobs of the user",
        success: true,
        jobs: updatedJobs,
      },
      { status: 200 }
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
