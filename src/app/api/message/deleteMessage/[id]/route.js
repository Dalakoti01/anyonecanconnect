import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Job from "@/models/jobModels";
import Message from "@/models/messageSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // So we can use params synchronously

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const messageId = params.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User Not Found", success: false },
        { status: 404 }
      );
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return NextResponse.json(
        { message: "No Such Message Found", success: false },
        { status: 404 }
      );
    }

    // Delete all associated project briefs (Jobs)
    if (message.projectBrief && message.projectBrief.length > 0) {
      await Promise.all(
        message.projectBrief.map(async (jobId) => {
          await Job.findByIdAndDelete(jobId);
        })
      );
    }

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    return NextResponse.json(
      {
        message: "Message and linked Project Brief(s) deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
