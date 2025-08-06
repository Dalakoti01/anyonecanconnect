"use client";

import {
  Bell,
  Loader2,
  Mail,
  Menu,
  Search
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { unreadNotifications } = useSelector((store) => store.realTimeNotification);


  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTalent, setSearchTalent] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [loading, setLoading] = useState(false);

  const [showJobPopover, setShowJobPopover] = useState(false);
  const [showEasyMoney, setShowEasyMoney] = useState(false);
  const [talentPopover, setTalentPopover] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const linkClass = (path) =>
    pathname === path
      ? "text-blue-600 font-medium pb-2 border-b-4 border-blue-600"
      : "text-black hover:text-blue-600";

  const handleTalentSearch = () => {
    if (searchTalent.trim()) {
      router.push(`/find-talent?search=${encodeURIComponent(searchTalent.trim())}`);
    }
  };

  const handleJobSearch = (e) => {
    e.preventDefault();
    if (searchJob.trim()) {
      router.push(`/find-jobs?search=${encodeURIComponent(searchJob.trim())}`);
    }
  };

  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/user/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        router.push("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full shadow-xl pb-3">
      <div className="bg-white w-full flex justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">AnyoneCanConnect</h1>
          <button className="md:hidden ml-4" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu />
          </button>
        </div>

        <div className={`md:flex gap-6 text-sm ${menuOpen ? "flex flex-col gap-3" : "hidden"} md:block mt-3`}>
          <Link href={user?.role === "client" ? "/client/dashboard" : "/freelancer/freelancersHome"} className={linkClass(user?.role === "client" ? "/client/dashboard" : "/freelancer/freelancersHome")}>
            Dashboard
          </Link>

          {user?.role === "client" ? (
            <>
              <div
                className="relative"
                onMouseEnter={() => setTalentPopover(true)}
                onMouseLeave={() => setTalentPopover(false)}
              >
                <Link href="/client/find-talent" className={linkClass("/client/find-talent")}>Find Talent</Link>
                {talentPopover && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                    <Link className="block px-4 py-2" href="/client/find-talent">Top Freelancer</Link>
                    <Link className="block px-4 py-2" href="/client/aiFreelancer">AI Freelancer</Link>
                    <Link className="block px-4 py-2" href="/client/verifiedFreelancer">Verified Freelancer</Link>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setShowJobPopover(true)}
                onMouseLeave={() => setShowJobPopover(false)}
              >
                <Link href="/client/myJobs" className={linkClass("/client/myJobs")}>My Job</Link>
                {showJobPopover && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                    <Link className="block px-4 py-2" href="/client/myJobs?status=progress">Running Jobs</Link>
                    <Link className="block px-4 py-2" href="/client/myJobs?status=completed">Completed Jobs</Link>
                    <Link className="block px-4 py-2" href="/client/myJobs?status=paused">Paused Jobs</Link>
                  </div>
                )}
              </div>

              <Link href="/client/hire-selectionAssistant" className={linkClass("/client/hire-selectionAssistant")}>Talent Selection</Link>
              <Link href="/client/transaction" className={linkClass("/client/transaction")}>Transaction</Link>
            </>
          ) : (
            <>
              <Link href="/freelancer/find-jobs" className={linkClass("/freelancer/find-jobs")}>Find Jobs</Link>
              <Link href="/freelancer/my-project" className={linkClass("/freelancer/my-project")}>My Project</Link>
              <Link href="/freelancer/proposals" className={linkClass("/freelancer/proposals")}>Proposals</Link>
              <div
                className="relative"
                onMouseEnter={() => setShowEasyMoney(true)}
                onMouseLeave={() => setShowEasyMoney(false)}
              >
                <Link href="/freelancer/mentorship" className={linkClass("/freelancer/mentorship")}>Easy Money</Link>
                {showEasyMoney && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                    <Link href="/freelancer/mentorship" className="block px-4 py-2">Mentorship</Link>
                    {user?.hiringAssistantStatus === "Accepted" && (
                      <Link href="/freelancer/hiringAssistantDashboard" className="block px-4 py-2">Hiring Assistant</Link>
                    )}
                    {user?.hiringAssistantStatus === "Inactive" && (
                      <Link href="/freelancer/joinHiringAssistant" className="block px-4 py-2">Hiring Assistant</Link>
                    )}
                    {user?.hiringAssistantStatus === "Pending" && (
                      <Link href="/freelancer/applyHiringForm" className="block px-4 py-2">Hiring Assistant</Link>
                    )}
                  </div>
                )}
              </div>
              <Link href="/freelancer/earnings" className={linkClass("/freelancer/earnings")}>Earnings</Link>
            </>
          )}

          <Link href="/community" className="text-md hover:text-blue-500">Community</Link>
        </div>

        <div className="flex items-center gap-5">
          <form onSubmit={handleJobSearch}>
            <div className="hidden md:flex items-center relative">
              <input
                onChange={(e) => setSearchJob(e.target.value)}
                placeholder={`Search For a ${user?.role === "client" ? "Talent" : "Job"}`}
                className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm"
              />
              <button type="submit" className="absolute right-3 text-gray-500">
                <Search />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Bell onClick={() => router.push("/notifications")} className="cursor-pointer text-gray-700" />
            {unreadNotifications?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadNotifications.length}
              </span>
            )}
            <Mail onClick={() => router.push("/message")} className="cursor-pointer text-gray-700" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profilePhoto} />
                <AvatarFallback>
                  {user?.fullName
                    ? user.fullName.split(" ").map((w) => w[0]).join("").toUpperCase()
                    : "CN"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <h1>{user?.fullName || "Karan Dalakoti"}</h1>
                <Button className='cursor-pointer' onClick={() => router.push("/editProfile")} variant="outline">
                  View Profile
                </Button>
                <LogoutButton/>
                {/* {loading ? (
                  <Button className='cursor-pointer' variant="outline" disabled>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" /> Please Wait
                  </Button>
                ) : (
                  // <Button className='cursor-pointer' onClick={logoutHandler} variant="outline">
                  //   Logout
                  // </Button>
                  <LogoutButton/>
                )} */}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
