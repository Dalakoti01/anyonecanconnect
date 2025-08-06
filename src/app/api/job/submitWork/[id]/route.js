// app/api/submit-work/[id]/route.js
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/jobModels";
import User from "@/models/userModels";
import Notification from "@/models/notificationSchema";
import Rank from "@/models/rankSchema";
import { parseForm } from "@/lib/parseForm";
import { Readable } from "stream";
import {getUserIdFromRequest} from "@/lib/getUserIdFromRequest";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export const runtime = "nodejs"; // So we can use params synchronously

// Disable body parsing so we can handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

function toNodeReadable(webRequest) {
  const reader = webRequest.body.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) return this.push(null);
      this.push(value);
    },
  });
}

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);
    const jobId = params.id;

    if (!user) {
      return NextResponse.json({ message: "User Not Found", success: false }, { status: 404 });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: "No such job found", success: false }, { status: 400 });
    }

    const client = await User.findById(job.owner);
    if (!client) {
      return NextResponse.json({ message: "Client Not Found", success: false }, { status: 404 });
    }

    const nodeReq = toNodeReadable(req);
    nodeReq.headers = Object.fromEntries(req.headers);

    const { files } = await parseForm(nodeReq);
    if (!files || Object.keys(files).length === 0) {
      return NextResponse.json({ success: false, message: "No files uploaded." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_DIRECTCONNECT,
        pass: process.env.PASSWORD_DIRECTCONNECT,
      },
    });

    const attachments = Object.values(files).flat().map(file => ({
      filename: file.originalFilename,
      content: file._writeStream?._buffer || "", // some `formidable` versions may expose _buffer like this
    }));

    await transporter.sendMail({
      from: `${user?.fullName} <${user.email}>`,
      to: ["nextconnecthub@gmail.com", client.email],
      subject: "New Work Submission",
      text: `Attached are the files submitted by ${user?.fullName}`,
      attachments,
    });

    job.status = "paused";

    const freelancersRank = await Rank.findOne({ userDetails: userId });
    if (!freelancersRank) {
      return NextResponse.json({ message: "User Rank Cannot Be Found", success: false }, { status: 400 });
    }

    freelancersRank.timeAccuracy.beforeReview.totalDeliveries += 1;

    if (new Date() < job.applicationDeadline) {
      freelancersRank.timeAccuracy.beforeReview.timelySubmissions += 1;
    }

    const reviewDeadline = new Date();
    reviewDeadline.setDate(reviewDeadline.getDate() + 5);
    job.clientReviewDeadline = reviewDeadline;

    await job.save();
    await freelancersRank.save();

    await Notification.create({
      sendersDetail: userId,
      recieversDetail: client._id,
      category: "Job",
      message: `${user?.fullName} submitted their work for review for "${job?.title}"`,
    });

    return NextResponse.json({
      message: "Files submitted and emailed successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("❌ Error in submitWork:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
