import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const userId = await getUserIdFromRequest(req);
    const notificationId = params.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "No Such User Found", success: false },
        { status: 404 }
      );
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return NextResponse.json(
        {
          message: "No Notification Found To Be Marked As Updated",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Notification marked as read",
        success: true,
        updatedNotification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in markSingleNotification:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
