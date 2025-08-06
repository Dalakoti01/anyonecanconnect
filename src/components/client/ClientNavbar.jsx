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

const ClientNavbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { unreadNotifications } = useSelector((store) => store.realTimeNotification);
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
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
      router.push(`/find-talent?search=${encodeURIComponent(searchTalent.trim())}`);
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
          <Link href="/client/dashboard" className={linkClass("/client/dashboard")}>Dashboard</Link>

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
          <Link href="/community" className="text-md hover:text-blue-500">Community</Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-2">
 <form onSubmit={handleTalentSearch}>
          
            <div className="hidden md:flex items-center relative">
              <input
                onChange={(e) => setSearchTalent(e.target.value)}
                placeholder="Search For a Talent"
                className="pl-4 pr-10 py-2 border border-gray-400 rounded-sm"
              />
              <button type="submit" className="absolute right-3 text-gray-500">
                <Search />
              </button>
            </div>
          </form>

          <Button
                variant="outline"   
                onClick={() => router.push("/client/postJobs")}
                className="bg-[#146fb9] cursor-pointer text-white font-bold mt-1"
              >
                Post Job
              </Button>
          </div>
         

          <div className="flex items-center gap-4 relative">
              {unreadNotifications?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadNotifications.length}
              </span>
            )}
            <Bell onClick={() => router.push("/notifications")} className="cursor-pointer text-gray-700" />
          
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
                <h1>{user?.fullName || "Client User"}</h1>
                <Button onClick={() => router.push("/editProfile")} variant="outline">
                  View Profile
                </Button>
                <LogoutButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ClientNavbar;
