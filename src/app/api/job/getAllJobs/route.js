import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModels";
import Job from "@/models/jobModels";

// GET /api/job/allActiveJobs?keyword=abc
export async function GET(req) {
  try {
    await dbConnect();

    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword") || "";

    const query = {
      $and: [
        { status: "active" },
        { _id: { $nin: user.rejectedJobs || [] } },
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    };

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate("owner")
      .populate("application");

    if (jobs.length === 0) {
      return NextResponse.json(
        {
          message: "No Jobs Exist As Of Now",
          success: true,
          jobs: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Jobs Found",
        success: true,
        jobs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("allActiveJobs error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
