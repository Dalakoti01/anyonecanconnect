import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import Job from "@/models/jobModels";

export const runtime = "nodejs"; // So we can use params synchronously


export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const ownerId = await getUserIdFromRequest(req);
    const jobId =  params.id;
    console.log("Job ID:", jobId);
    const job = await Job.findOne({ _id: jobId, owner: ownerId });

    if (!job) {
      return new Response(
        JSON.stringify({
          message: "No Such Job Exist",
          success: false,
        }),
        { status: 404 }
      );
    }

    await Job.deleteOne({ _id: jobId });

    return new Response(
      JSON.stringify({
        message: "Job Deleted Successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete job error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        success: false,
      }),
      { status: 500 }
    );
  }
}
