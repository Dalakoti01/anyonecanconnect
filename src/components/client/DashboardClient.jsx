"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Bot,
  CalendarDays,
  ChevronsLeftRightEllipsis,
  IndianRupee,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import useGetAllSuggestedTalent from "@/hooks/useGetAllSuggestedTalent";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { setSelectedUser, setUserContacts } from "@/redux/authSlice";
import useGetAllUnreadNotifications from "@/hooks/useGetAllUnreadNotifications";
import { setAdminJobs } from "@/redux/jobSlice";

const DashboardClient = () => {
  useGetAllUnreadNotifications();
  const [daysFilter, setDaysFilter] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { userContacts } = useSelector((store) => store.auth);
  useGetAllSuggestedTalent();
  useGetAdminJobs();
  const { user } = useSelector((store) => store.auth);
  const { adminsJobs } = useSelector((store) => store.job);
  const handleFilterChange = (value) => {
    setDaysFilter(value === "all" ? null : Number(value));
  };

  const filteredJobs = daysFilter
    ? adminsJobs?.filter((job) => {
        const jobDate = new Date(job.createdAt);
        const now = new Date();
        const diffInDays = Math.floor((now - jobDate) / (1000 * 60 * 60 * 24));
        return diffInDays <= daysFilter && job?.status !== "completed";
      })
    : adminsJobs?.filter((job) => job?.status !== "completed");

  const { suggestedFreelancers } = useSelector((store) => store.auth);
  const [displayFreelancers, setDisplayFreelancers] = useState([]);
  const completedJobsCount = adminsJobs?.filter(
    (job) => job?.status === "completed"
  ).length;
  const activeJobsCount = adminsJobs?.filter(
    (job) =>
      job?.status === "active" ||
      job?.status === "progress" ||
      job?.status === "paused"
  ).length;

  let userRating = 0;
  user?.yourRating?.map((ratings) => {
    userRating = userRating + ratings?.rating;
  });

  userRating = userRating / user?.yourRating?.length || 0;

  useEffect(() => {
    if (suggestedFreelancers?.length > 0) {
      const shuffled = [...suggestedFreelancers].sort(
        () => 0.5 - Math.random()
      );
      setDisplayFreelancers(shuffled.slice(0, 3));
    }
  }, [suggestedFreelancers]);
  const getNewConnectionsThisMonth = () => {
    if (!user?.connectedFreelancers) return 0;

    const now = new Date();
    return user.connectedFreelancers.filter(({ connectedAt }) => {
      const date = new Date(connectedAt);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;
  };

  useEffect(() => {
    dispatch(setAdminJobs([]));
  }, []);
  return (
    <div className="relative pt-5">
      <div className="pb-5 flex flex-col lg:flex-row justify-center bg-[#fcfcfc] min-h-screen px-2 sm:px-4 md:px-6">
        {/* Main Content */}
        <div className="w-full lg:w-3/4 px-0 sm:px-2 md:px-4 py-4">
          {/* Welcome and Performance */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 items-center">
            <div className="bg-blue-800 w-full md:w-1/2 mb-6 text-white rounded-lg p-5 sm:p-7">
              <h1 className="font-bold text-2xl sm:text-4xl text-center">
                Welcome Back {user?.fullName}
              </h1>
              <p className="mt-6 sm:mt-10 text-base sm:text-xl text-center">
                Discover new opportunities and manage your freelancing career
                efficiently.
              </p>
            </div>
            <div className="flex flex-col w-full md:w-1/2 p-5 sm:p-10 py-8 justify-center items-center gap-5 rounded-lg bg-[rgb(241,236,236)]">
              <p className="text-slate-700 text-lg sm:text-xl font-bold text-center">
                Your Performance Dashboard
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <div className="shadow-xl flex flex-col gap-2 justify-center items-center w-full sm:w-[200px] bg-white p-4 rounded-lg border-t-4 border-blue-800">
                  <h1 className="font-bold text-xl sm:text-2xl">
                    {activeJobsCount}
                  </h1>
                  <p>Active Jobs</p>
                </div>
                <div className="shadow-xl flex flex-col gap-2 justify-center items-center w-full sm:w-[200px] bg-white p-4 rounded-lg border-t-4 border-green-800">
                  <h1 className="font-bold text-xl sm:text-2xl">
                    {user?.connectedFreelancers?.length}
                  </h1>
                  <p>Talent Connections</p>
                </div>
                <div className="shadow-xl flex flex-col gap-2 justify-center items-center w-full sm:w-[200px] bg-white p-4 rounded-lg border-t-4 border-yellow-500">
                  <h1 className="font-bold flex text-xl sm:text-2xl">
                    <IndianRupee className="mt-1" /> {user?.money}
                  </h1>
                  <p>Money Spent</p>
                </div>
              </div>
            </div>
          </div>
          {/* Active Jobs */}
          <div className="flex flex-col overflow-hidden">
            <div className="bg-white mt-7 mx-auto w-full max-w-5xl rounded-md shadow-xl pt-6 sm:pt-10">
              <div className="flex w-full px-3 sm:px-5 cursor-pointer justify-between pb-3 sm:pb-5 border-b">
                <h1 className="text-base sm:text-lg font-semibold">
                  Active Jobs
                </h1>
                <h1
                  className="text-blue-500 cursor-pointer"
                  onClick={() => router.push("/client/myJobs")}
                >
                  View All
                </h1>
              </div>
              <div className="overflow-x-auto">
                {filteredJobs?.map((job) => (
                  <div
                    key={job?._id}
                    className="pt-4 sm:pt-5 px-3 sm:px-5 cursor-pointer flex flex-col gap-2 bg-white w-full max-w-5xl rounded-md hover:bg-slate-200 mx-auto"
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <h1 className="text-base sm:text-lg">{job?.title}</h1>
                      <Badge
                        className={
                          job?.status === "active"
                            ? "bg-slate-200 text-green-600"
                            : job?.status === "progress"
                            ? "bg-yellow-200 text-yellow-600"
                            : job?.status === "completed"
                            ? "bg-blue-200 text-blue-600"
                            : ""
                        }
                        variant="outline"
                      >
                        {job?.status}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
                      <div className="flex gap-1 items-center">
                        <ChevronsLeftRightEllipsis />
                        <p>{job?.category}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <CalendarDays />
                        <p>
                          {job?.applicationDeadline
                            ? Math.ceil(
                                (new Date(job.applicationDeadline) -
                                  new Date()) /
                                  (1000 * 60 * 60 * 24)
                              ) + " days left"
                            : "No Deadline"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{job?.description}</p>
                    <div className="flex flex-col sm:flex-row justify-between pb-3 sm:pb-5 gap-2">
                      <p className="text-slate-700 text-xs sm:text-sm">
                        {job?.application?.length} Applicants
                      </p>
                      <p className="text-xs sm:text-sm">
                        Posted{" "}
                        {Math.floor(
                          (new Date() - new Date(job?.createdAt)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 px-0 sm:px-2 md:px-4 py-4 flex flex-col gap-6">
          <div className="bg-white w-full sm:w-[180px] text-black mx-auto">
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-full sm:w-[180px] text-black">
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="allTime">All Time</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">This Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 sm:mt-10 bg-white max-w-full sm:max-w-md flex flex-col justify-center rounded-md items-center gap-5 p-4 sm:p-5 mx-auto">
            <Avatar>
              <AvatarImage src={user?.profilePhoto} alt="image" />
              <AvatarFallback>
                {user?.fullName
                  ? user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "CN"}
              </AvatarFallback>
            </Avatar>
            <p className="text-center">{user?.fullName}</p>
            <p className="text-slate-500 text-center">{user?.username}</p>
            <div className="flex flex-col sm:flex-row justify-center px-0 sm:px-5 gap-3 w-full">
              <div className="bg-slate-100 rounded-md flex p-3 sm:p-4 flex-col gap-2 sm:gap-4 w-full sm:w-auto">
                <h1 className="text-xs sm:text-base">Feedback By Freelancer</h1>
                <h1 className="font-bold text-lg sm:text-xl">
                  {userRating || 0}
                </h1>
              </div>
              <div className="bg-slate-100 rounded-md p-3 sm:p-4 flex flex-col gap-2 sm:gap-4 w-full sm:w-auto">
                <h1 className="text-xs sm:text-base">Talents Hired</h1>
                <h1 className="font-bold text-lg sm:text-xl">
                  {user?.connectedFreelancers?.length}
                </h1>
              </div>
            </div>
            <Button
              onClick={() => router.push("/editProfile")}
              variant="outline"
              className="bg-white border-blue-500 w-full text-lg px-5 text-blue-500"
            >
              Edit Profile
            </Button>
          </div>
          <div className="mt-6 sm:mt-10 p-4 sm:p-5 rounded-sm bg-blue-700 text-white font-bold flex max-w-full sm:max-w-md flex-col gap-4 sm:gap-5 mx-auto">
            <div className="flex gap-2 items-center">
              <Bot />
              <h1>Hiring Assistant</h1>
            </div>
            <p>
              Get tailored job descriptions, candidate matching, and skill
              assessments with our assistant.
            </p>
            <Button variant="outline" className="bg-white text-blue-500">
              Try Assistant
            </Button>
          </div>
          <div className="bg-white mt-5 w-full max-w-full sm:max-w-md flex justify-between items-center border-b-2 rounded-md border-slate-300 p-4 mx-auto">
            <h1 className="text-base sm:text-xl font-semibold">
              Recommended Talent
            </h1>
            <p className="text-blue-500 cursor-pointer">View All</p>
          </div>
          {displayFreelancers?.map((freelancers) => (
            <div
              className="flex flex-col sm:flex-row justify-between items-center bg-white w-full max-w-full sm:max-w-md p-3 mx-auto gap-3 sm:gap-0"
              key={freelancers?._id}
            >
              <div className="flex gap-3 items-center w-full">
                <Avatar>
                  <AvatarImage
                    src={freelancers?.profile?.profilePhoto}
                    alt="image"
                  />
                  <AvatarFallback>
                    {freelancers?.fullName
                      ? freelancers.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "CN"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 w-full">
                  <h1 className="font-medium">{freelancers?.fullName}</h1>
                  <p className="text-xs sm:text-sm line-clamp-2">
                    {freelancers?.profile?.bio
                      ?.split(" ")
                      .slice(0, 30)
                      .join(" ") +
                      (freelancers?.profile?.bio?.split(" ").length > 30
                        ? "..."
                        : "")}
                  </p>
                  <h1 className="text-xs sm:text-base">Rating : 4</h1>
                </div>
              </div>
              <h1
                onClick={() => {
                  dispatch(setUserContacts([...userContacts, freelancers]));
                  dispatch(setSelectedUser(freelancers));
                  router.push("/message");
                }}
                className="text-blue-500 cursor-pointer mt-2 sm:mt-0 whitespace-nowrap"
              >
                Connect
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
