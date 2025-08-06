"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { IndianRupee, SquareCheck, User } from "lucide-react";
import RatingStars from "../shared/RatingStars";
import useGetAllFreelancersApplication from "@/hooks/useGetAllFreelancersApplication";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "@/redux/jobSlice";
import { setSelectedApplication } from "@/redux/applicationSlice";
import useGetAllFreelancersProposals from "@/hooks/useGetAllFreelancersProposals";
import { isToday } from "date-fns";
import { useRouter } from "next/navigation";
import { setMessagingClients } from "@/redux/authSlice";
import DialogEditApplication from "./Dialog/DialogEditApplication";

const Proposals = () => {
  const { user, messagingClients } = useSelector((store) => store.auth);
  const [openApplication, setOpenApplication] = useState(false);
  useGetAllFreelancersApplication();
  useGetAllFreelancersProposals();
  const { allApplications, allProposals } = useSelector((store) => store.application);
  const [input, setInput] = useState("myApplications");
  const [applicationId, setApplicationId] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const [applicationStatus, setApplicationStatus] = useState("all");
  const filteredApplications = allApplications?.filter((application) => {
    const status = application?.status || "";
    return applicationStatus === "all" || status === applicationStatus;
  });

  let userRating = 0;
  user?.yourRating?.forEach((r) => {
    userRating += r?.rating;
  });
  userRating = userRating / (user?.yourRating?.length || 1);

  return (
    <div className="w-full pt-5 min-h-screen bg-[#fcfcfc] px-4">
      <div className="w-full max-w-7xl mx-auto mt-5 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        {/* Left Content */}
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-xl font-bold">Proposals</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b-2 border-slate-200 pb-5">
            <h1
              className={`cursor-pointer ${input === "myApplications"
                  ? "text-blue-600 font-bold border-b-2 border-blue-700"
                  : "text-black"
                }`}
              onClick={() => setInput("myApplications")}
            >
              My Applications
            </h1>
            <h1
              className={`cursor-pointer ${input === "clientProposals"
                  ? "text-blue-600 font-bold border-b-2 border-blue-700"
                  : "text-black"
                }`}
              onClick={() => setInput("clientProposals")}
            >
              Client Proposals
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Show {input === "myApplications" ? allApplications?.length : allProposals?.length} Applications
            </p>

            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-700">Filter :</p>
              <Select value={applicationStatus} onValueChange={setApplicationStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Applications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="accepted">Shortlisted</SelectItem>
                  <SelectItem value="pending">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applications or Proposals */}
          {input !== "clientProposals"
            ? filteredApplications.map((application) => (
              <div
                key={application?._id}
                className="bg-white rounded-lg border-l-4 border-blue-700 p-5 flex flex-col gap-3"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h1 className="font-bold text-xl">{application?.job?.title}</h1>
                  <Badge
                    className={`w-fit mt-2 sm:mt-0 ${application?.status === "pending"
                        ? "bg-blue-200 text-blue-700"
                        : application?.status === "accepted"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    variant="outline"
                  >
                    {application?.status}
                  </Badge>
                </div>

                <p>{application?.job?.owner?.fullName}</p>
                <p>{application?.job?.description}</p>

                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <p className="flex gap-1">
                    <IndianRupee />
                    {application?.job?.salary}
                  </p>
                  <p>Applied 3 days ago</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-blue-700 text-white"
                    onClick={() => {
                      setOpenApplication(true);
                      setApplicationId(application?._id);
                      dispatch(setSelectedJob(application?.job));
                      dispatch(setSelectedApplication(application));
                    }}
                    variant="outline"
                  >
                    View Application
                  </Button>
                  <Button variant="outline">Send Message</Button>
                </div>

                <DialogEditApplication
                  application={applicationId}
                  open={openApplication}
                  setOpen={setOpenApplication}
                />
              </div>
            ))
            : allProposals.map((proposal) => (
              <div
                key={proposal?._id}
                className="bg-white border-l-4 border-blue-700 p-5 flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h1 className="font-bold text-xl">
                    You've received a proposal for '{proposal?.title}'
                  </h1>
                  <Badge variant="outline">{proposal?.status}</Badge>
                </div>
                <p>From: {proposal?.owner?.fullName}</p>
                <p>{proposal?.description}</p>
                <p className="text-blue-600 flex gap-1">
                  Budget: <IndianRupee /> {proposal?.salary}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <p>
                    {isToday(new Date(proposal?.createdAt))
                      ? "Today"
                      : `${Math.floor(
                        (Date.now() - new Date(proposal?.createdAt)) / (1000 * 60 * 60 * 24)
                      )} days ago`}
                  </p>
                  <Button
                    onClick={() => {
                      dispatch(setMessagingClients([...messagingClients, proposal?.owner]));
                      router.push("/message");
                    }}
                    className="bg-blue-700 text-white hover:bg-blue-800"
                    variant="outline"
                  >
                    View Proposal
                  </Button>
                </div>
              </div>
            ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-full flex flex-col gap-7">
          <div className="bg-white rounded-lg py-5 px-10 flex flex-col gap-4">
            <h1 className="font-bold">Your Profile Overview</h1>
            <div className="flex justify-between text-center">
              <div className="bg-gray-200 p-2 rounded-lg">
                <h1 className="text-2xl font-bold text-blue-600">
                  {user?.proposalsSent?.length || 0}
                </h1>
                <p className="text-xs">Proposals Sent</p>
              </div>
              <div className="bg-gray-200 p-2 rounded-lg">
                <h1 className="text-2xl font-bold text-blue-600">
                  {user?.activeJobs?.length || 0}
                </h1>
                <p className="text-xs">Active Projects</p>
              </div>
            </div>

            <div className="flex text-sm justify-between">
              <h1>Profile Completion</h1>
              <p>{user?.profileCompletion}%</p>
            </div>
            <div className="flex text-sm justify-between">
              <h1>Your Rating</h1>
              <p>{userRating}</p>
            </div>

            <RatingStars rating={userRating} />
            <Button
              onClick={() => router.push("/editProfile")}
              variant="outline"
              className="bg-blue-700 text-white w-full"
            >
              View Full Profile
            </Button>
          </div>

          <div className="bg-white rounded-lg p-5 text-sm flex flex-col gap-3">
            <h1>Quick Actions</h1>
            <div className="flex items-center gap-4 cursor-pointer">
              <User />
              <h1 onClick={() => router.push("/editProfile")} className="hover:text-blue-600">
                Update Profile
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <SquareCheck />
              <h1 className="hover:text-blue-600">Add New Skill & Certifications</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
