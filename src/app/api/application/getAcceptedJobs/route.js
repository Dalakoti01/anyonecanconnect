import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Application from "@/models/applicationModel";

export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({
        message: "No such user found",
        success: false,
      }, { status: 404 });
    }

    const applications = await Application.find({
      "applicant.user": userId,
      status: "accepted",
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "owner", // assumes `owner` is a ref to User in Job model
        },
      });

    if (!applications || applications.length === 0) {
      return NextResponse.json({
        message: "No such application found",
        success: false,
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Accepted Application AND jobs found",
      success: true,
      applications,
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Error in getAcceptedJobs:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
    }, { status: 500 });
  }
}
