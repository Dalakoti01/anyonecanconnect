import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Notification from "@/models/notificationSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE(req, { params }) {
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

    const notificationId = params.id;

    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return NextResponse.json(
        { message: "Notification not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Notification deleted from database",
        success: true,
        deletedNotification,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
