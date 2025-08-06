import dbConnect from "@/lib/dbConnect";
import Conversation from "@/models/conversationSchema";
import { NextResponse } from "next/server";
import Message from "@/models/messageSchema";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";

export const runtime = "nodejs"; // So we can use params synchronously


export async function GET(req, context ) {
  await dbConnect();

  try {
    const ladka = await getUserIdFromRequest(req); // sender
   const { params } = context;
  const ladki =   params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [ladka, ladki] },
    }).populate({
      path: "messages",
      populate: {
        path: "projectBrief", // assuming this is a Job reference in each message
        model: "Job",
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { message: [], success: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: conversation.messages, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get message error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
