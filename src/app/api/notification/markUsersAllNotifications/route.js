import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  await dbConnect();

  try {
    const userId = await getUserIdFromRequest(req);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "No Such User Found", success: false },
        { status: 404 }
      );
    }

    const updatedNotifications = await Notification.updateMany(
      { recieversDetail: userId },
      { $set: { isRead: true } }
    );

    if (!updatedNotifications || updatedNotifications.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No Notification present to be updated", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "All the notifications of the user have been marked as read",
        success: true,
        updatedNotifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in markAllUsersNotification:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
