import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {getUserIdFromRequest} from "@/lib/getUserIdFromRequest";
import User from "@/models/userModels";
import Job from "@/models/jobModels";
import Rank from "@/models/rankSchema";
import Notification from "@/models/notificationSchema";
// import { getRecieverSocketId, io } from "@/utils/socket"; // Uncomment if using sockets

export const runtime = "nodejs"; // So we can use params synchronously


export async function GET(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const jobId = params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "No such job found", success: false }, { status: 404 });
    }

    if (userId.toString() !== job.owner.toString()) {
      return NextResponse.json(
        { message: "You do not have permission to perform this action", success: false },
        { status: 403 }
      );
    }

    const freelancerId = job.freelancerAccepted;

    job.status = "progress";
    await job.save();

    const freelancersRank = await Rank.findOne({ userDetails: freelancerId });
    if (!freelancersRank) {
      return NextResponse.json({
        message: "Freelancer rank not found",
        success: false,
      }, { status: 404 });
    }

    freelancersRank.timeAccuracy.beforeReview.timelySubmissions -= 1;
    await freelancersRank.save();

    const notification = await Notification.create({
      sendersDetail: userId,
      recieversDetail: freelancerId,
      category: "Job",
      message: `${user.fullName} has marked your work as incomplete submission and this is not good for your rating (${job.title})`,
    });

    // Socket notification (if using real-time)
    // const recieverSocketId = getRecieverSocketId(freelancerId);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("notification", notification);
    // }

    return NextResponse.json({
      message: "Job was marked as incomplete. Freelancer is told to resubmit work.",
      success: true,
      job,
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Error in incompleteWork controller:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    }, { status: 500 });
  }
}
