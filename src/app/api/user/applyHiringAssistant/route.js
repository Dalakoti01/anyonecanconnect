import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import HiringAssistant from "@/models/hiringAssistantSchema";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
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

    const alreadyApplied = await HiringAssistant.findOne({ userDetails: userId });
    if (alreadyApplied) {
      return NextResponse.json(
        {
          message: "You have already applied as a Hiring Assistant",
          success: false,
        },
        { status: 400 }
      );
    }

    const {
      yourSpecialization,
      yearsOfExperience,
      skills,
      reason,
    } = await req.json();

    if (!yourSpecialization || !yearsOfExperience || !skills || !reason) {
      return NextResponse.json(
        { message: "Something is Missing", success: false },
        { status: 400 }
      );
    }

    const hiringAssistant = await HiringAssistant.create({
      userDetails: userId,
      yourSpecialization,
      yearsOfExperience,
      skills,
      reason,
    });

    if (!hiringAssistant) {
      return NextResponse.json(
        {
          message: "Application cannot be submitted",
          success: false,
        },
        { status: 401 }
      );
    }

    await hiringAssistant.populate({ path: "userDetails" });

    const existingUser = await User.findByIdAndUpdate(
      userId,
      { hiringAssistantStatus: "Pending" },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Application Submitted",
        success: true,
        existingUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in applyAsHiringAssistant:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
