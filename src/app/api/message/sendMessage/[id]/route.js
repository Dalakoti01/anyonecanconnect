import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Conversation from "@/models/conversationSchema";
import Message from "@/models/messageSchema";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { getReceiverSocketId, io } from "../../../../../../socket/server";
// import { getRecieverSocketId, io } from "@/lib/socket"; // Uncomment when using sockets

export const runtime = "nodejs"; // So we can use params synchronously


export async function POST(req, { params }) {
  await dbConnect();

  try {
    const ladka = await getUserIdFromRequest(req); // sender
    const ladki = params.id; // receiver
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { message: "Message cannot be empty", success: false },
        { status: 401 }
      );
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [ladka, ladki] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [ladka, ladki],
      });
    }

    const newMessage = await Message.create({
      message,
      sendersId: ladka,
      recieversId: ladki,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const sender = await User.findById(ladka);

    const notification = await Notification.create({
      sendersDetail: ladka,
      recieversDetail: ladki,
      category: "Message",
      message: `${sender?.fullName} Sent You A Message`,
    });

    // --- SOCKET.IO IMPLEMENTATION ---
    
    const recieverSocketId = getReceiverSocketId(ladki);
    console.log("recieverSocketId", recieverSocketId);
    
    if (recieverSocketId) {
      console.log("Emitting to receiver socket ID:", recieverSocketId);
      
      io.to(recieverSocketId).emit("newMessage", newMessage);
      io.to(recieverSocketId).emit("notification", notification);
      console.log("messageNotification", notification);
    }
    

    return NextResponse.json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
