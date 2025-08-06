import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Conversation from "@/models/conversationSchema";
import Job from "@/models/jobModels";
import Message from "@/models/messageSchema";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";
// import { getRecieverSocketId, io } from "@/lib/socket"; // Adjust if needed

export const runtime = "nodejs"; // So we can use params synchronously


export async function POST(req, { params }) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);
    const otherUser = params.id;

    if (!user) {
      return NextResponse.json(
        { message: "No such user exist", success: false },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, description, delivarables, salary, duration, budgetType } =
      body;

    if (
      !title ||
      !description ||
      !delivarables ||
      !salary ||
      !duration ||
      !budgetType
    ) {
      return NextResponse.json(
        { message: "Something is Missing", success: false },
        { status: 400 }
      );
    }

    const deadline = new Date(
      Date.now() + parseInt(duration) * 7 * 24 * 60 * 60 * 1000
    );

    const job = await Job.create({
      title,
      description,
      delivarables,
      salary,
      duration,
      budgetType,
      applicationDeadline: deadline,
    });

    if (!job) {
      return NextResponse.json(
        { message: "No such job is created", success: false },
        { status: 404 }
      );
    }

    // Assign job owner/freelancer based on role
    if (user.role === "client") {
      job.owner = userId;
      job.freelancerAccepted = otherUser;
    } else {
      job.freelancerAccepted = userId;
      job.owner = otherUser;
    }

    const notification = await Notification.create({
      sendersDetail: userId,
      recieversDetail: otherUser,
      category: "Proposals",
      message: `${user.fullName} sent you a job proposal`,
    });

    // const recieverSocketId = getRecieverSocketId(otherUser);
    // if (recieverSocketId) {
    //   io.to(recieverSocketId).emit("notification", notification);
    // }

    job.status = "specific";
    await job.save();

    const message = await Message.create({
      sendersId: userId,
      recieversId: otherUser,
      message: "Project Brief Added",
      projectBrief: [job._id],
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "projectBrief"
    );

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUser] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, otherUser],
        messages: [message._id],
      });
    } else {
      conversation.messages.push(message._id);
      await conversation.save();
    }

    return NextResponse.json(
      {
        message: "Job and Message created successfully",
        success: true,
        job,
        messageData: populatedMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
