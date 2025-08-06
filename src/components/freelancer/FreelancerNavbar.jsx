"use client";

import { Bell, Mail, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import LogoutButton from "../shared/LogoutButton";

const FreelancerNavbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { unreadNotifications } = useSelector((store) => store.realTimeNotification);
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchJob, setSearchJob] = useState("");
  const [showEasyMoney, setShowEasyMoney] = useState(false);

  const linkClass = (path) =>
    pathname === path
      ? "text-blue-600 font-medium pb-2 border-b-4 border-blue-600"
      : "text-black hover:text-blue-600";

  const handleJobSearch = (e) => {
    e.preventDefault();
    if (searchJob.trim()) {
      router.push(`/find-jobs?search=${encodeURIComponent(searchJob.trim())}`);
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
          <Link href="/freelancer/freelancersHome" className={linkClass("/freelancer/freelancersHome")}>Dashboard</Link>
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
          <Link href="/community" className="text-md hover:text-blue-500">Community</Link>
        </div>

        <div className="flex items-center gap-5">
          <form onSubmit={handleJobSearch}>
            <div className="hidden md:flex items-center relative">
              <input
                onChange={(e) => setSearchJob(e.target.value)}
                placeholder="Search For a Job"
                className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm"
              />
              <button type="submit" className="absolute right-3 text-gray-500">
                <Search />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 relative">
             {unreadNotifications?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadNotifications.length}
              </span>
            )}
                        <Mail onClick={() => router.push("/message")} className="cursor-pointer text-gray-700" />

            <Bell onClick={() => router.push("/notifications")} className="cursor-pointer text-gray-700" />
           
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profilePhoto} />
                <AvatarFallback>{user?.fullName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <h1>{user?.fullName}</h1>
                <Button onClick={() => router.push("/editProfile")} variant="outline">View Profile</Button>
                <LogoutButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FreelancerNavbar;
