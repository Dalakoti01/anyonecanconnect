"use client";

import {
  Box,
  Brush,
  ChevronsLeftRight,
  ChevronUp,
  IndianRupee,
  MemoryStick,
  MessageCircle,
  PanelsTopLeft,
  PenTool,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import useGetAllNotifications from "@/hooks/useGetAllNotifications";
import useGetUserRank from "@/hooks/useGetUserRank";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";

const FreelancerHome = () => {
  useGetAllJobs();
  useGetAllNotifications();
  useGetUserRank();

  const router = useRouter();
  const { user } = useSelector((store) => store.auth);
  const { jobs } = useSelector((store) => store.job);
  const { allNotifications } = useSelector((store) => store.realTimeNotification);
  const topTenNotifications = allNotifications?.slice(0, 10) || [];

  const totalRating = useMemo(() => {
    if (!user?.yourRating?.length) return 0;
    return (
      user.yourRating.reduce((acc, cur) => acc + (cur.rating || 0), 0) /
      user.yourRating.length
    ).toFixed(2);
  }, [user?.yourRating]);

  return (
    <div className="w-full min-h-screen pt-6 pb-10 h-full bg-[#fcfcfc]">
      {/* Hero Section */}
      <div className="w-full flex justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-center gap-5">
          <div className="bg-blue-800 w-full md:w-[450px] text-white rounded-lg p-5 md:p-7 mb-4 md:mb-0">
            <h1 className="font-bold text-2xl md:text-4xl text-center">
              Welcome Back {user?.fullName}
            </h1>
            <p className="mt-6 md:mt-10 text-base md:text-xl text-center">
              Discover new opportunities and manage your freelancing career efficiently.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 md:gap-7 rounded-lg p-4 md:p-5 bg-[rgb(241,236,236)] w-full">
            <p className="text-slate-700 text-lg md:text-xl font-bold text-center">
              Your Performance Dashboard
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full justify-center">
              <div className="shadow-xl flex flex-col items-center w-full sm:w-[200px] bg-white p-4 md:p-5 rounded-lg border-t-4 border-blue-800">
                <h1 className="font-bold text-xl md:text-2xl">{user?.activeJob?.length || 0}</h1>
                <p>Active Jobs</p>
              </div>
              <div className="shadow-xl flex flex-col items-center w-full sm:w-[200px] bg-white p-4 md:p-5 rounded-lg border-t-4 border-green-800">
                <h1 className="font-bold text-xl md:text-2xl">{user?.projectCompleted}</h1>
                <p>Project Completed</p>
              </div>
              <div className="shadow-xl flex flex-col items-center w-full sm:w-[200px] bg-white p-4 md:p-5 rounded-lg border-t-4 border-yellow-500">
                <h1 className="font-bold flex text-xl md:text-2xl">
                  <IndianRupee className="mt-1" /> {user?.money || 0}
                </h1>
                <p>Earned This Month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Analytics */}
      <div className="w-full flex justify-center mt-10">
        <div className="max-w-7xl w-full bg-white shadow-xl rounded-xl p-4 md:p-5 flex flex-col gap-5 md:gap-7">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <h1 className="font-bold text-xl md:text-2xl">Your Dashboard</h1>
            <p className="cursor-pointer text-sm text-blue-500">View All Analytics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-2 md:gap-4">
              <h1 className="font-bold text-2xl md:text-3xl text-blue-800">{totalRating}</h1>
              <p className="text-slate-600">Client Rating</p>
              <ChevronUp className="text-green-500" size={18} />
            </div>
            <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-2 md:gap-4">
              <h1 className="font-bold text-2xl md:text-3xl text-blue-800">
                {user?.proposalsSent?.length}
              </h1>
              <p className="text-slate-600">Job Proposals</p>
              <ChevronUp className="text-green-500" size={18} />
            </div>
            <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-2 md:gap-4">
              <h1 className="font-bold text-2xl md:text-3xl text-blue-800">
                {user?.proposalsAccepted || 0}
              </h1>
              <p className="text-slate-600">Proposals Accepted</p>
              <ChevronUp className="text-green-500" size={18} />
            </div>
            <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-2 md:gap-4">
              <h1 className="font-bold text-2xl md:text-3xl text-blue-800">
                {user?.rank?.user?.rank?.toFixed(2) || 0}
              </h1>
              <p className="text-slate-600">Rank</p>
              <ChevronUp className="text-green-500" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="w-full flex justify-center mt-10">
        <div className="flex w-full max-w-7xl justify-between flex-col sm:flex-row gap-2 sm:gap-0">
          <h1 className="font-bold text-xl md:text-2xl">Recommended for You</h1>
          <p onClick={() => router.push("/find-jobs")} className="text-sm text-blue-500 cursor-pointer">
            Browse All Jobs
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="w-full max-w-7xl mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {jobs?.map((job) => (
            <div key={job._id} className="shadow-xl rounded-lg bg-white flex flex-col gap-3 py-5">
              <h1 className="px-5 font-bold text-lg md:text-xl">{job?.title}</h1>
              <div className="flex flex-wrap px-5 gap-2 md:gap-4 border-b-2 border-slate-400 pb-4">
                {job?.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-100 text-blue-500 rounded-lg">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-rows-4 gap-2 md:gap-3 px-5">
                <div className="flex justify-between">
                  <p className="text-slate-600">Budget :</p>
                  <div className="flex"><IndianRupee />{job?.salary}</div>
                </div>
                <div className="flex justify-between">
                  <p className="text-slate-600">Duration :</p>
                  <div className="flex">{job?.applicationDeadline.split("T")[0]}</div>
                </div>
                <div className="flex justify-between">
                  <p className="text-slate-600">Experience :</p>
                  <div className="flex">Intermediate To Expert</div>
                </div>
                <div className="flex justify-between">
                  <p className="text-slate-600">Posted :</p>
                  <div className="flex">
                    {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 mt-3 p-3 flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className="font-bold text-lg md:text-xl">{job?.owner?.fullName}</h1>
                </div>
                <Button onClick={() => router.push("/find-jobs")} variant="outline" className="bg-blue-700 text-white">
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="w-full flex justify-center mt-10">
        <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg p-4 md:p-5 flex flex-col gap-5 md:gap-7">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <h1 className="font-bold text-xl md:text-2xl">Browse By Skills</h1>
            <p onClick={() => router.push("/find-jobs")} className="text-blue-500 cursor-pointer">
              View All Skills
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { icon: PanelsTopLeft, title: "Web Design", jobs: 842 },
              { icon: ChevronsLeftRight, title: "Web Development", jobs: 1204 },
              { icon: PenTool, title: "Graphic Design", jobs: 764 },
              { icon: Box, title: "3D Modeling", jobs: 329 },
              { icon: Brush, title: "UI/UX", jobs: 567 },
              { icon: MemoryStick, title: "Digital Marketing", jobs: 412 },
            ].map((item, i) => (
              <div key={i} className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3"><item.icon /></div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-slate-600">{item.jobs} Jobs Available</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Activity */}
      <div className="w-full flex justify-center mt-10 pb-10">
        <div className="max-w-7xl w-full bg-white rounded-lg shadow-xl p-4 md:p-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <p className="font-bold text-lg md:text-xl">Latest Activity</p>
            <p onClick={() => router.push("/notification")} className="text-sm text-blue-600 cursor-pointer">
              View All Activity
            </p>
          </div>
          {topTenNotifications.map((notification, index) => (
            <div key={index} className="bg-slate-100 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-lg gap-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full flex justify-center w-[30px] h-[30px] bg-blue-100 text-blue-500">
                  <MessageCircle />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">
                    New {notification?.category} from {notification?.sendersDetail?.fullName}
                  </h1>
                  <p className="text-slate-500">{notification?.message}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerHome;
