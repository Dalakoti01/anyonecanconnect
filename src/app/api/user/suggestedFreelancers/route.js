import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import User from "@/models/userModels";

export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req); // extract from token or session
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const verified = searchParams.get("verified");

    const filter = {
      _id: { $ne: userId },
      role: "freelancer",
    };

    if (verified === "true") {
      filter.verifiedFreelancer = true;
    } else if (verified === "false") {
      filter.verifiedFreelancer = false;
    }

    const suggestedUsers = await User.find(filter).select("-password");

    if (!suggestedUsers || suggestedUsers.length === 0) {
      return NextResponse.json(
        {
          message: "No Suggested Freelancers Found",
          success: true,
          users: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Suggested Freelancers Found",
        success: true,
        users: suggestedUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Suggested Freelancer Error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
