import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/jobModels";
import User from "@/models/userModels";
import Application from "@/models/applicationModel";
import Notification from "@/models/notificationSchema";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Rank from "@/models/rankSchema";
// import { getRecieverSocketId, io } from "@/lib/socket";

export const runtime = "nodejs"; // So we can use params synchronously


export async function POST(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const jobId = params.id;
    const body = await req.json();

    const {
      coverLetter,
      yourApproach,
      estimatedTimeLine,
      yourBid,
      portfolio,
      questionsForClient,
      paymentDeliveryTerms,
    } = body;
    console.log("Apply Job Body:", body);

    if (!coverLetter || !yourApproach || !estimatedTimeLine || !yourBid) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const job = await Job.findById(jobId).populate("owner");
    if (!job) {
      return NextResponse.json(
        { message: "No such job found", success: false },
        { status: 404 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "No such user is found", success: false },
        { status: 404 }
      );
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      "applicant.user": userId,
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "Already Applied For this job", success: false, job },
        { status: 400 }
      );
    }

    const newApplication = await Application.create({
      applicant: 
        {
          user: userId,
          coverLetter,
          yourApproach,
          estimatedTimeLine,
          yourBid,
          portfolio,
          questionsForClient,
          paymentDeliveryTerms,
        },
      
      job: jobId,
      owner: job.owner,
    });

    const usersRank = await Rank.findOne({ userDetails: userId });
    if (!usersRank) {
      return NextResponse.json(
        { message: "Rank Of this User cannot be calculated", success: false },
        { status: 404 }
      );
    }

    usersRank.conversionRate.totalProposals += 1;
    usersRank.uspClearity.totalWorkDone += 1;

    const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

    const jobSkills = job?.skills?.map(normalize) || [];
    const uspSkills = user?.skillProfile?.uspSkill?.map(normalize) || [];

    const hasMatchingSkill = uspSkills.some((uspSkill) =>
      jobSkills.includes(uspSkill)
    );
    if (hasMatchingSkill) {
      usersRank.uspClearity.uspRelated += 1;
    }

    await usersRank.save();

    await User.findByIdAndUpdate(userId, {
      $addToSet: { proposalsSent: newApplication._id },
    });

    const updatedUser = await User.findById(userId);

    job.application.push(newApplication._id);
    await job.populate("application");
    await job.save();

    const notification = await Notification.create({
      sendersDetail: userId,
      recieversDetail: job.owner._id,
      category: "Job",
      message: `${user.fullName} applied on ${job.title} job`,
    });

    // const recieverSocketId = getRecieverSocketId(job.owner._id);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("notification", notification);
    //   console.log("Apply for job notification", notification);
    // }

    return NextResponse.json(
      {
        message: "Successfully Applied for the job",
        success: true,
        job,
        user: updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Apply Job Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
