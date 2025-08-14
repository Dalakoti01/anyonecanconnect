"use client";

import { Bell, Mail, Menu, Search, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import LogoutButton from "../shared/LogoutButton";

const ClientNavbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { unreadNotifications } = useSelector(
    (store) => store.realTimeNotification
  );
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTalent, setSearchTalent] = useState("");
  const [talentPopover, setTalentPopover] = useState(false);
  const [showJobPopover, setShowJobPopover] = useState(false);

  const linkClass = (path) =>
    pathname === path
      ? "text-blue-600 font-medium pb-2 border-b-4 border-blue-600"
      : "text-black hover:text-blue-600";

  const handleTalentSearch = (e) => {
    e.preventDefault();
    if (searchTalent.trim()) {
      router.push(
        `/find-talent?search=${encodeURIComponent(searchTalent.trim())}`
      );
      setMobileSearchOpen(false);
    }
  };

  return (
    <div className="w-full shadow-xl pb-3 overflow-x-hidden">
      <div className="bg-white w-full flex justify-between items-center px-4 py-3">
        {/* Left Side */}
      <div className="flex items-center gap-4 lg:gap-20 xl:gap-40">
          {/* Brand */}
          <h1 className="text-lg font-bold whitespace-nowrap">
            AnyoneCanConnect
          </h1>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-6 text-sm">
            <Link
              href="/client/dashboard"
              className={linkClass("/client/dashboard")}
            >
              Dashboard
            </Link>

            {/* CHANGE 2: Popover on hover for Find Talent */}
            <Popover open={talentPopover} onOpenChange={setTalentPopover}>
              <PopoverTrigger asChild>
                <div
                  onMouseEnter={() => setTalentPopover(true)}
                  onMouseLeave={() => setTalentPopover(false)}
                >
                  <Link
                    href="/client/find-talent"
                    className={linkClass("/client/find-talent")}
                  >
                    Find Talent
                  </Link>
                </div>
              </PopoverTrigger>
              <PopoverContent
                onMouseEnter={() => setTalentPopover(true)}
                onMouseLeave={() => setTalentPopover(false)}
                className="w-48 bg-white shadow-lg border rounded-md p-2 z-50 pointer-events-auto"
              >
                <Link className="block px-4 py-2" href="/client/find-talent">
                  Top Freelancer
                </Link>
                <Link className="block px-4 py-2" href="/client/aiFreelancer">
                  AI Freelancer
                </Link>
                <Link
                  className="block px-4 py-2"
                  href="/client/verifiedFreelancer"
                >
                  Verified Freelancer
                </Link>
              </PopoverContent>
            </Popover>

            {/* CHANGE 3: Popover on hover for My Job */}
            <Popover open={showJobPopover} onOpenChange={setShowJobPopover}>
              <PopoverTrigger asChild>
                <div
                  onMouseEnter={() => setShowJobPopover(true)}
                  onMouseLeave={() => setShowJobPopover(false)}
                >
                  <Link
                    href="/client/myJobs"
                    className={linkClass("/client/myJobs")}
                  >
                    My Job
                  </Link>
                </div>
              </PopoverTrigger>
              <PopoverContent
                onMouseEnter={() => setShowJobPopover(true)}
                onMouseLeave={() => setShowJobPopover(false)}
                className="w-48 bg-white shadow-lg border rounded-md p-2 z-50 pointer-events-auto"
              >
                <Link
                  className="block px-4 py-2"
                  href="/client/myJobs?status=progress"
                >
                  Running Jobs
                </Link>
                <Link
                  className="block px-4 py-2"
                  href="/client/myJobs?status=completed"
                >
                  Completed Jobs
                </Link>
                <Link
                  className="block px-4 py-2"
                  href="/client/myJobs?status=paused"
                >
                  Paused Jobs
                </Link>
              </PopoverContent>
            </Popover>

            <Link
              href="/client/hire-selectionAssistant"
              className={linkClass("/client/hire-selectionAssistant")}
            >
              Talent Selection
            </Link>
            <Link
              href="/client/transaction"
              className={linkClass("/client/transaction")}
            >
              Transaction
            </Link>
            <Link href="/community" className="text-md hover:text-blue-500">
              Community
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Search (only ≥1280px) */}
          <form
            onSubmit={handleTalentSearch}
            className="hidden xl:flex items-center relative"
          >
            <input
              onChange={(e) => setSearchTalent(e.target.value)}
              placeholder="Search For a Talent"
              className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm"
            />
            <button type="submit" className="absolute right-3 text-gray-500">
              <Search />
            </button>
          </form>

          {/* Search icon for mobile+tablet (<1280px) */}
          <button
            className="xl:hidden"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
          >
            <Search />
          </button>

          {/* Desktop Post Job + icons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/client/postJobs")}
              className="bg-[#146fb9] text-white font-bold"
            >
              Post Job
            </Button>

            <div className="relative">
              {unreadNotifications?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
              <Bell
                onClick={() => router.push("/notifications")}
                className="cursor-pointer text-gray-700"
              />
            </div>

            <Mail
              onClick={() => router.push("/message")}
              className="cursor-pointer text-gray-700"
            />
          </div>

          {/* Mobile more menu */}
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <MoreHorizontal className="cursor-pointer text-gray-700" />
              </PopoverTrigger>
              <PopoverContent className="w-40 flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/client/postJobs")}
                  className="bg-[#146fb9] text-white font-bold w-full"
                >
                  Post Job
                </Button>
                <div className="flex items-center justify-center gap-5">
                  <div className="relative">
                    {unreadNotifications?.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unreadNotifications.length}
                      </span>
                    )}
                    <Bell
                      onClick={() => router.push("/notifications")}
                      className="cursor-pointer text-gray-700"
                    />
                  </div>
                  <Mail
                    onClick={() => router.push("/message")}
                    className="cursor-pointer text-gray-700"
                  />
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
                  {user?.fullName
                    ? user.fullName
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()
                    : "CN"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <h1>{user?.fullName || "Client User"}</h1>
                <Button
                  onClick={() => router.push("/editProfile")}
                  variant="outline"
                >
                  View Profile
                </Button>
                <LogoutButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile/Tablet Search Drawer (<1280px) */}
      {mobileSearchOpen && (
        <div className="px-4 py-2 xl:hidden">
          <form
            onSubmit={handleTalentSearch}
            className="flex items-center relative"
          >
            <input
              onChange={(e) => setSearchTalent(e.target.value)}
              placeholder="Search For a Talent"
              className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm w-full"
            />
            <button type="submit" className="absolute right-3 text-gray-500">
              <Search />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-3 px-5 lg:hidden">
          {/* Each category row with horizontal items */}
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/client/dashboard"
              className={linkClass("/client/dashboard")}
            >
              Dashboard
            </Link>
            <Link
              href="/client/find-talent"
              className={linkClass("/client/find-talent")}
            >
              Find Talent
            </Link>
            <Link href="/client/myJobs" className={linkClass("/client/myJobs")}>
              My Job
            </Link>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/client/hire-selectionAssistant"
              className={linkClass("/client/hire-selectionAssistant")}
            >
              Talent Selection
            </Link>
            <Link
              href="/client/transaction"
              className={linkClass("/client/transaction")}
            >
              Transaction
            </Link>
            <Link href="/community" className="text-md hover:text-blue-500">
              Community
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientNavbar;
