import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensures compatibility with Mongoose

export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "No Such User Found",
          success: false,
        },
        { status: 404 }
      );
    }

    const unreadNotifications = await Notification.find({
      recieversDetail: userId,
      isRead: false,
    });

    if (!unreadNotifications || unreadNotifications.length === 0) {
      return NextResponse.json(
        {
          message: "No Unread Notification found",
          success: false,
          notifications: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Unread Notifications found",
        success: true,
        notifications: unreadNotifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
