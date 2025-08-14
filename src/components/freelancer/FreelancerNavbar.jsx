"use client";

import { Bell, Mail, Menu, Search, MoreHorizontal } from "lucide-react";
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
      setMobileSearchOpen(false);
    }
  };

  return (
    <div className="w-full shadow-xl pb-3">
      <div className="bg-white w-full flex justify-between items-center px-4 py-3">
        {/* Left - Brand & Menu */}
        <div className="flex items-center gap-4 lg:gap-20">
          <h1 className="text-lg font-bold whitespace-nowrap">AnyoneCanConnect</h1>

          {/* Desktop Nav (laptop and up) */}
          <div className="hidden lg:flex gap-6 text-sm">
            <Link href="/freelancer/freelancersHome" className={linkClass("/freelancer/freelancersHome")}>
              Dashboard
            </Link>
            <Link href="/freelancer/find-jobs" className={linkClass("/freelancer/find-jobs")}>
              Find Jobs
            </Link>
            <Link href="/freelancer/my-project" className={linkClass("/freelancer/my-project")}>
              My Project
            </Link>
            <Link href="/freelancer/proposals" className={linkClass("/freelancer/proposals")}>
              Proposals
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setShowEasyMoney(true)}
              onMouseLeave={() => setShowEasyMoney(false)}
            >
              <Link href="/freelancer/mentorship" className={linkClass("/freelancer/mentorship")}>
                Easy Money
              </Link>
              {showEasyMoney && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2 z-50">
                  <Link href="/freelancer/mentorship" className="block px-4 py-2">
                    Mentorship
                  </Link>
                  {user?.hiringAssistantStatus === "Accepted" && (
                    <Link href="/freelancer/hiringAssistantDashboard" className="block px-4 py-2">
                      Hiring Assistant
                    </Link>
                  )}
                  {user?.hiringAssistantStatus === "Inactive" && (
                    <Link href="/freelancer/joinHiringAssistant" className="block px-4 py-2">
                      Hiring Assistant
                    </Link>
                  )}
                  {user?.hiringAssistantStatus === "Pending" && (
                    <Link href="/freelancer/applyHiringForm" className="block px-4 py-2">
                      Hiring Assistant
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Link href="/freelancer/earnings" className={linkClass("/freelancer/earnings")}>
              Earnings
            </Link>
            <Link href="/community" className="text-md hover:text-blue-500">
              Community
            </Link>
          </div>

          {/* Hamburger for < lg (phones + tablets) */}
          <button className="lg:hidden" onClick={() => setMenuOpen((p) => !p)}>
            <Menu />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search for xl+ screens */}
          <form
            onSubmit={handleJobSearch}
            className="hidden xl:flex items-center relative"
          >
            <input
              onChange={(e) => setSearchJob(e.target.value)}
              placeholder="Search For a Job"
              className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm"
            />
            <button type="submit" className="absolute right-3 text-gray-500">
              <Search />
            </button>
          </form>

          {/* Search icon for <xl screens (Nest Hub / iPad Pro) */}
          <button
            className="xl:hidden"
            onClick={() => setMobileSearchOpen((p) => !p)}
          >
            <Search />
          </button>

          {/* Icons for md+ (tablet/desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Mail onClick={() => router.push("/message")} className="cursor-pointer text-gray-700" />
            <div className="relative">
              {unreadNotifications?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
              <Bell onClick={() => router.push("/notifications")} className="cursor-pointer text-gray-700" />
            </div>
          </div>

          {/* Overflow menu for phones only */}
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <MoreHorizontal className="cursor-pointer text-gray-700" />
              </PopoverTrigger>
              <PopoverContent className="w-40 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-5">
                  <Mail onClick={() => router.push("/message")} className="cursor-pointer text-gray-700" />
                  <div className="relative">
                    {unreadNotifications?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unreadNotifications.length}
                      </span>
                    )}
                    <Bell onClick={() => router.push("/notifications")} className="cursor-pointer text-gray-700" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Avatar */}
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profilePhoto} />
                <AvatarFallback>
                  {user?.fullName ? user.fullName.split(" ").map((w) => w[0]).join("").toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <h1>{user?.fullName || "Freelancer User"}</h1>
                <Button onClick={() => router.push("/editProfile")} variant="outline">
                  View Profile
                </Button>
                <LogoutButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Collapsible search bar for <xl screens */}
      {mobileSearchOpen && (
        <div className="px-4 py-2 xl:hidden">
          <form onSubmit={handleJobSearch} className="flex items-center relative">
            <input
              onChange={(e) => setSearchJob(e.target.value)}
              placeholder="Search For a Job"
              className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm w-full"
            />
            <button type="submit" className="absolute right-3 text-gray-500">
              <Search />
            </button>
          </form>
        </div>
      )}

      {/* Mobile/Tablet menu (shown under hamburger) */}
      {menuOpen && (
        <div className="flex flex-col gap-4 text-sm mt-3 px-5 lg:hidden">
          <Link href="/freelancer/freelancersHome" className={linkClass("/freelancer/freelancersHome")}>
            Dashboard
          </Link>
          <Link href="/freelancer/find-jobs" className={linkClass("/freelancer/find-jobs")}>
            Find Jobs
          </Link>
          <Link href="/freelancer/my-project" className={linkClass("/freelancer/my-project")}>
            My Project
          </Link>
          <Link href="/freelancer/proposals" className={linkClass("/freelancer/proposals")}>
            Proposals
          </Link>
          <Link href="/freelancer/mentorship" className={linkClass("/freelancer/mentorship")}>
            Easy Money
          </Link>
          <Link href="/freelancer/earnings" className={linkClass("/freelancer/earnings")}>
            Earnings
          </Link>
          <Link href="/community" className="text-md hover:text-blue-500">
            Community
          </Link>
        </div>
      )}
    </div>
  );
};

export default FreelancerNavbar;
