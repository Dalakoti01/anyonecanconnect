import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Conversation from "@/models/conversationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const currentUserId = await getUserIdFromRequest(req);

    // Find all conversations that include this user
    const conversations = await Conversation.find({
      participants: currentUserId,
    });

    // Collect the other participants (not the logged-in user)
    const otherUserIds = new Set();

    conversations.forEach((conv) => {
      conv.participants.forEach((participantId) => {
        if (participantId.toString() !== currentUserId) {
          otherUserIds.add(participantId.toString());
        }
      });
    });

    // Fetch only clients from those users
    const clients = await User.find({
      _id: { $in: Array.from(otherUserIds) },
      role: "client",
    });

    return NextResponse.json(
      {
        success: true,
        clients,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in getClientContacts:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
