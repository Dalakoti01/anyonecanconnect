import { NextResponse } from "next/server";
// import { getRecieverSocketId, io } from "@/lib/socket"; // make sure you export io properly
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";
import Job from "@/models/jobModels";
import Rank from "@/models/rankSchema";
import Notification from "@/models/notificationSchema";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

export const runtime = "nodejs"; // So we can use params synchronously


export async function POST(req, { params }) {
  await dbConnect();

  try {
    const clientId = await getUserIdFromRequest(req);
    const client = await User.findById(clientId);
    if (!client) {
      return NextResponse.json(
        { message: "No such client found", success: false },
        { status: 404 }
      );
    }

    const jobId = params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { message: "No such job found", success: false },
        { status: 404 }
      );
    }

    const freelancerId = job.freelancerAccepted;
    const body = await req.json();
    const { rating, feedback, responseScore, suggestions } = body;

    if (!rating || !feedback) {
      return NextResponse.json(
        { message: "You have to fill both rating and feedback", success: false },
        { status: 400 }
      );
    }

    // Optional: Prevent duplicate rating
    const freelancer = await User.findOne({
      _id: freelancerId,
      "yourRating.user": clientId,
      "yourRating.job": jobId,
    });

    if (freelancer) {
      return NextResponse.json(
        { message: "You have already rated this freelancer", success: false },
        { status: 400 }
      );
    }

    const freelancersRank = await Rank.findOne({ userDetails: freelancerId });
    if (freelancersRank) {
      freelancersRank.responseTime.totalScore += responseScore;
      freelancersRank.responseTime.totalWork += 1;
      freelancersRank.clientRating.totalRating += rating;
      freelancersRank.clientRating.totalReviews += 1;
      await freelancersRank.save();
    }

    await User.findByIdAndUpdate(freelancerId, {
      $push: {
        yourRating: {
          user: clientId,
          job: jobId,
          rating,
          feedback,
        },
      },
    });

    job.reviewGiven.byClient = true;
    await job.save();

    const notification = await Notification.create({
      sendersDetail: clientId,
      recieversDetail: freelancerId,
      category: "Rating",
      message: `${client?.fullName} has rated your profile`,
    });

    // const receiverSocketId = getRecieverSocketId(freelancerId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("notification", notification);
    //   console.log("Client has rated Freelancer", notification);
    // }

    return NextResponse.json({
      message: "Feedback Given",
      success: true,
    });
  } catch (error) {
    console.error("Rate freelancer error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
