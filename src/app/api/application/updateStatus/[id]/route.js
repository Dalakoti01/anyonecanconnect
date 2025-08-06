import { NextResponse } from "next/server";
// import { getRecieverSocketId, io } from "@/utils/socket"; // adjust import as per your structure
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromRequest } from "@/lib/getUserIdFromRequest";
import User from "@/models/userModels";
import Application from "@/models/applicationModel";
import Job from "@/models/jobModels";
import Rank from "@/models/rankSchema";
import Notification from "@/models/notificationSchema";

export const runtime = "nodejs"; // So we can use params synchronously


export async function POST(req, { params }) {
  try {
    await dbConnect();
    const userId = await getUserIdFromRequest(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "No Such User Found", success: false }, { status: 404 });
    }

    const { status } = await req.json();
    const applicationId = params.id;

    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
      return NextResponse.json({ message: "No Such Application found", success: false }, { status: 400 });
    }

    const job = application.job;
    const applicantId = application?.applicant?.user;

    const client = await User.findById(job?.owner);
    if (!client) {
      return NextResponse.json({ message: "No Client is found", success: false }, { status: 404 });
    }

    application.status = status;

    if (status === "rejected") {
      await User.findByIdAndUpdate(applicantId, {
        $addToSet: { rejectedJobs: job?._id },
        $inc: { proposalsRejected: 1 },
      });

      await Application.findByIdAndDelete(applicationId);

      return NextResponse.json({ message: "Application Rejected", success: true }, { status: 200 });
    }

    if (status === "accepted") {
      const estimatedTimeLine = application?.applicant?.estimatedTimeLine;

      if (estimatedTimeLine) {
        const numbers = estimatedTimeLine.match(/\d+/g)?.map(Number);
        if (numbers?.length > 0) {
          const maxWeeks = Math.max(...numbers);
          const newDeadline = new Date();
          newDeadline.setDate(newDeadline.getDate() + maxWeeks * 7);

          await Job.findByIdAndUpdate(job?._id, {
            applicationDeadline: newDeadline,
          });
        }
      }

      const yourBid = Number(application?.applicant?.yourBid) || 0;
      await Job.findByIdAndUpdate(job?._id, {
        salary: yourBid,
        "paymentStatus.advancePaid": true,
        "paymentStatus.advancePaidAt": new Date(),
      });

      await User.findByIdAndUpdate(applicantId, {
        $addToSet: {
          activeJobs: job._id,
          connectedClient: application.owner,
        },
        $inc: { proposalsAccepted: 1 },
      });

      await User.findByIdAndUpdate(user._id, {
        $addToSet: {
          activeJobs: job._id,
        },
      });

      const alreadyConnected = client?.connectedFreelancers?.some(
        (entry) => entry.freelancer.toString() === applicantId.toString()
      );

      if (!alreadyConnected) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: {
            connectedFreelancers: {
              freelancer: applicantId,
              connectedAt: new Date(),
            },
          },
        });
      }

      await Job.findByIdAndUpdate(job._id, {
        freelancerAccepted: applicantId,
        acceptedApplication: applicationId,
      });

      const freelancer = await User.findById(applicantId);

      const usersRank = await Rank.findOne({ userDetails: applicantId });
      if (usersRank) {
        usersRank.rehireRate.totalWork += 1;
        usersRank.conversionRate.acceptedProposals += 1;
        if (freelancer?.connectedClient?.includes(application.owner)) {
          usersRank.rehireRate.sameClient += 1;
        }
        await usersRank.save();
      }

      job.status = "progress";
      await job.save();

      // const notification = await Notification.create({
      //   sendersDetail: client,
      //   recieversDetail: applicantId,
      //   category: "Job",
      //   message: `${client?.fullName} has accepted your job application `,
      // });

    //   const recieverSocketId = getRecieverSocketId(applicantId.toString());
    //   if (recieverSocketId) {
    //     io.to(recieverSocketId).emit("notification", notification);
    //   }

      await Notification.create({
        sendersDetail: client,
        recieversDetail: applicantId,
        category: "Job",
        message: `${client?.fullName} accepted your job application`,
      });

      await application.save();

      const updatedClient = await User.findById(client._id);

      return NextResponse.json(
        {
          message: "Status Updated Successfully",
          success: true,
          updatedClient,
          updatedFreelancer: freelancer,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Unhandled status value", success: false },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Error in updateStatus controller:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
