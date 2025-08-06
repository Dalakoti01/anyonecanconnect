import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Mentorship from "@/models/mentorshipSchema";
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

    const {
      fullName,
      email,
      currentProfession,
      experience,
      areaOfExpertise,
      professionalBio,
      linkedin,
      availability,
      mentoringType,
      reason,
      freeSession,
    } = await req.json();

    if (
      !fullName ||
      !email ||
      !currentProfession ||
      !experience ||
      !areaOfExpertise ||
      !professionalBio ||
      !linkedin ||
      !availability ||
      !mentoringType ||
      !reason ||
      freeSession === undefined // explicitly check for undefined (since false is a valid value)
    ) {
      return NextResponse.json(
        {
          message: "Something is missing. Please fill all the fields properly.",
          success: false,
        },
        { status: 400 }
      );
    }

    const mentorship = await Mentorship.create({
      userId,
      fullName,
      email,
      currentProfession,
      experience,
      areaOfExpertise,
      professionalBio,
      linkedin,
      availability,
      mentoringType,
      reason,
      freeSession,
    });

    if (!mentorship) {
      return NextResponse.json(
        {
          message: "Form cannot be submitted due to some issue",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully applied for mentorship",
        success: true,
        mentorship,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in applyAsMentor:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
