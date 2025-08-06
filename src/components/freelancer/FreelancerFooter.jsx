"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const FreelancersFooter = () => {
  const backendUri = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${backendUri}/api/v1/user/userToUpdate`,
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full border-t-2 border-slate-400 bg-[#F5F5F5]">
      <div className="p-5 grid grid-cols-1 lg:grid-cols-5 gap-4 w-full pb-3 border-b-2 border-slate-400">
        {/* Branding + Social */}
        <div className="flex flex-col gap-2">
          <h1 className="underline text-blue-600 font-bold text-lg">
            AnyOneCanConnect
          </h1>
          <p className="text-sm">
            Where collaboration triumphs over competition. Grow your freelance
            career without commission fees.
          </p>
          <div className="flex gap-2">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <div
                key={i}
                className="bg-slate-400 rounded-full p-3 hover:bg-blue-600 cursor-pointer hover:text-white"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* For Freelancers */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 font-bold text-md">For Freelancers</h1>
          <div className="flex flex-col gap-1 text-slate-600 text-sm">
            <p
              className="hover:text-blue-600 cursor-pointer w-fit"
              onClick={() => router.push("/find-jobs")}
            >
              Find Projects
            </p>
            <p
              className="hover:text-blue-600 cursor-pointer w-fit"
              onClick={() => router.push("/mentorship")}
            >
              Mentorship Program
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Ranking System
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Skill Development
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Freelance Showcase
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Collaboration Zone
            </p>
          </div>
        </div>

        {/* Community */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 font-bold text-md">Community</h1>
          <div className="flex flex-col gap-1 text-sm text-slate-600">
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Q & A Forums
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Webinars & Workshops
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Success Stories
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Internet-Based Groups
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Internship Opportunities
            </p>
          </div>
        </div>

        {/* Resource */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 font-bold text-md">Resource</h1>
          <div className="flex flex-col gap-1 text-sm text-slate-600">
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Help Center
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Freelancers Guide
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Skill Test
            </p>
            <p
              className="hover:text-blue-600 cursor-pointer w-fit"
              onClick={() => router.push("/blog")}
            >
              Blog
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Feedback
            </p>
          </div>
        </div>

        {/* Subscribe */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 text-md font-bold">Stay Connected</h1>
          <div className="flex flex-col text-sm gap-1">
            <p>
              Get notified about new features, events and opportunities.
            </p>
            <div className="flex gap-2">
              <Input
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
              />
              <Button onClick={submitHandler} variant="outline">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-slate-600">
              We respect your privacy. Unsubscribe at any time.
            </p>
            <div className="flex flex-col gap-2">
              <Badge
                variant="outline"
                className="rounded-full w-fit bg-blue-600 text-white"
              >
                No Commission Fees
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full w-fit bg-blue-600 text-white"
              >
                Unlimited Collaborations
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Legal links */}
      <div className="flex justify-center gap-4 pt-5 flex-wrap">
        <p
          onClick={() => router.push("/terms-condition")}
          className="text-sm w-fit text-slate-600 hover:text-blue-600 cursor-pointer"
        >
          Terms Of Service
        </p>
        <p
          onClick={() => router.push("/privacy-policy")}
          className="text-sm text-slate-600 w-fit hover:text-blue-600 cursor-pointer"
        >
          Privacy Policy
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer w-fit">
          User Agreement
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer w-fit">
          Cookie Policy
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer w-fit">
          About Us
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer w-fit">
          Contact Us
        </p>
      </div>

      <div className="flex justify-center pt-5 pb-5">
        <p className="text-xs">© 2025 Next Connect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FreelancersFooter;
