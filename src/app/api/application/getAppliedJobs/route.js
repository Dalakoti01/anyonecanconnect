import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Application from "@/models/applicationModel";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Required for Mongoose and cookies()

export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User Does Not Exist", success: false },
        { status: 404 }
      );
    }

    const applications = await Application.find({ "applicant.user": userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "owner",
        },
      });

    if (!applications) {
      return NextResponse.json(
        { message: "No such Application", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "All Applications Found",
        success: true,
        applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
