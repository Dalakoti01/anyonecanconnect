import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Mentorship from "@/models/mentorshipSchema";
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

    const mentorships = await Mentorship.find({ userId });

    if (!mentorships || mentorships.length === 0) {
      return NextResponse.json(
        { message: "Not Applied For Mentoring", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Applied For Mentoring",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getMentorship:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
