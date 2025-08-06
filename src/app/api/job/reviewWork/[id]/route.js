// src/app/api/job/reviewChanges/[id]/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {getUserIdFromRequest} from "@/lib/getUserIdFromRequest";
import User from "@/models/userModels";
import Job from "@/models/jobModels";
import Notification from "@/models/notificationSchema";
// import { getRecieverSocketId, io } from "@/utils/socket"; // Optional if using sockets

export const runtime = "nodejs"; // So we can use params synchronously


export async function POST(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const jobId = params.id;

    const body = await req.json();
    const { changes } = body;

    const client = await User.findById(userId);
    if (!client) {
      return NextResponse.json(
        { message: "User Not Found", success: false },
        { status: 404 }
      );
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { message: "No Such Job Found", success: false },
        { status: 404 }
      );
    }

    if (userId !== job?.owner.toString()) {
      return NextResponse.json(
        { message: "You are not authorized to make this action", success: false },
        { status: 401 }
      );
    }

    if (new Date() > job?.clientReviewDeadline) {
      job.status = "completed";
      await job.save();

      return NextResponse.json(
        {
          message:
            "The time to take review for the submitted work is over. You cannot make this action.",
          success: true,
        },
        { status: 400 }
      );
    }

    const reviewDeadline = new Date();
    reviewDeadline.setDate(reviewDeadline.getDate() + 4);

    job.freelancerReviewDeadline = reviewDeadline;
    job.reviewChanges = changes;
    job.status = "review";
    job.reviewChance = true;
    await job.save();

    const notification = await Notification.create({
      sendersDetail: userId,
      recieversDetail: job?.freelancerAccepted,
      category: "Job",
      message: `${client?.fullName} has submitted review feedback for ${job?.title}. Complete the requested changes in 4 days to maintain a good rank.`,
    });

    // Optional: socket notification (uncomment if needed)
    // const recieverSocketId = getRecieverSocketId(job?.freelancerAccepted);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("notification", notification);
    // }

    return NextResponse.json({
      message: "Job successfully sent for review",
      success: true,
      job,
    });
  } catch (error) {
    console.error("❌ Error in reviewChanges controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
