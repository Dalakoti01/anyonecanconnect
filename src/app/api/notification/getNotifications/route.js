import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensures compatibility with Mongoose & cookies

export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "No Such User Found", success: false },
        { status: 404 }
      );
    }

    const notifications = await Notification.find({
      recieversDetail: userId,
    })
      .sort({ createdAt: -1 })
      .populate({ path: "sendersDetail" });

    if (!notifications || notifications.length === 0) {
      return NextResponse.json(
        {
          message: "No notifications found",
          success: true,
          notifications: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Notifications fetched successfully",
        success: true,
        notifications,
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
