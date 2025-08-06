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

    if (userId !== job.owner.toString()) {
      return NextResponse.json(
        { message: "You do not have permission to perform this action", success: false },
        { status: 403 }
      );
    }

    const freelancerId = job.freelancerAccepted;

    // Update Job status
    job.status = "completed";
    job.completionDate = new Date();
    job.paymentStatus.finalPaid = true;
    job.paymentStatus.finalPaidAt = new Date();
    await job.save();

    // Update freelancer's user stats
    await User.findByIdAndUpdate(freelancerId, {
      $inc: { projectCompleted: 1 },
      $pull: { activeJobs: job._id },
    });

    // Remove from client's activeJobs too
    await User.findByIdAndUpdate(userId, {
      $pull: { activeJobs: job._id },
    });

    // Update freelancer's rank
    const freelancersRank = await Rank.findOne({ userDetails: freelancerId });
    if (!freelancersRank) {
      return NextResponse.json(
        { message: "Freelancer's rank not found", success: false },
        { status: 404 }
      );
    }

    freelancersRank.timeAccuracy.afterReview.totalDeliveries += 1;
    if (new Date() < job.freelancerReviewDeadline) {
      freelancersRank.timeAccuracy.afterReview.timelySubmissions += 1;
    }
    await freelancersRank.save();

    // Send notification
    const notification = await Notification.create({
      sendersDetail: userId,
      recieversDetail: freelancerId,
      category: "Job",
      message: `${user.fullName} has marked your work as completed submission for ${job.title}`,
    });

    // Emit real-time notification if sockets are configured
    // const recieverSocketId = getRecieverSocketId(freelancerId);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("notification", notification);
    // }

    const updatedFreelancer = await User.findById(freelancerId);
    const updatedClient = await User.findById(userId);

    return NextResponse.json(
      {
        message: "Job accepted successfully",
        success: true,
        job,
        updatedFreelancer,
        updatedClient,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in acceptWork route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
