import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Job from "@/models/jobModels";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // if you're using synchronous params access

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const jobId = params.id;
    const userId = await getUserIdFromRequest(req);

    const job = await Job.findById(jobId)
      .populate({ path: "owner" })
      .populate({ path: "freelancerAccepted" });

    if (!job) {
      return NextResponse.json(
        { message: "Job Not Found", success: false },
        { status: 404 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User Not Found", success: false },
        { status: 404 }
      );
    }

    job.status = "progress";

    await Notification.create({
      sendersDetail: job.owner,
      recieversDetail: job.freelancerAccepted,
      category: "Proposals",
      message: `${job.owner?.fullName} Accepted Your Job Proposal`,
    });

    await job.save();

    return NextResponse.json(
      {
        message: "Job Confirmed and in progress status now",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in confirmProposedJob:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
