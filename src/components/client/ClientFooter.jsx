"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const ClientFooter = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/userToUpdate",
        { email },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full border-t-2 border-slate-400 bg-[#F5F5F5]">
      <div className="p-5 grid grid-cols-1 lg:grid-cols-4 gap-4 w-full pb-3 border-b-2 border-slate-400">
        {/* Brand Section */}
        <div className="flex flex-col gap-5">
          <h1 className="underline text-blue-600 font-bold text-lg">
            AnyOneCanConnect
          </h1>
          <p className="text-sm">
            The platform that revolutionizes freelance collaboration by
            connecting clients and freelancers directly without commission fees.
          </p>
          <div className="flex gap-2">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
              <div
                key={idx}
                className="bg-slate-400 rounded-full p-3 hover:bg-blue-600 cursor-pointer hover:text-white"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* For Clients */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 font-bold text-md">For Clients</h1>
          <div className="flex flex-col gap-1 text-slate-600 text-sm">
            <p className="hover:text-blue-600 w-fit cursor-pointer">
              How It Works
            </p>
            <p
              className="hover:text-blue-600 w-fit cursor-pointer"
              onClick={() => router.push("/post-jobs")}
            >
              Post A Project
            </p>
            <p
              className="hover:text-blue-600 w-fit cursor-pointer"
              onClick={() => router.push("/find-talent")}
            >
              Browse Freelancers
            </p>
            <p
              className="hover:text-blue-600 w-fit cursor-pointer"
              onClick={() => router.push("/aiFreelancer")}
            >
              AI Powered Job Creation
            </p>
            <p
              className="hover:text-blue-600 w-fit cursor-pointer"
              onClick={() => router.push("/hire-selectionAssistant")}
            >
              Hiring Assistants
            </p>
          </div>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 font-bold text-md">Resource</h1>
          <div className="flex flex-col gap-1 text-sm text-slate-600">
            <p className="hover:text-blue-600 cursor-pointer w-fit">Community</p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Success Stories
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Client Review
            </p>
            <p className="hover:text-blue-600 cursor-pointer w-fit">
              Help Center
            </p>
            <p
              className="hover:text-blue-600 cursor-pointer w-fit"
              onClick={() => router.push("/blog")}
            >
              Blog
            </p>
          </div>
        </div>

        {/* Stay Connected */}
        <div className="flex flex-col gap-2">
          <h1 className="text-blue-600 text-md font-bold">Stay Connected</h1>
          <div className="flex flex-col gap-1">
            <p>
              Get notified about new features, events and opportunities.
            </p>
            <div className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
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

      {/* Footer Links */}
      <div className="flex justify-center gap-4 pt-5 flex-wrap">
        <p
          className="text-sm text-slate-600 hover:text-blue-600 w-fit cursor-pointer"
          onClick={() => router.push("/terms-condition")}
        >
          Terms Of Service
        </p>
        <p
          className="text-sm text-slate-600 hover:text-blue-600 w-fit cursor-pointer"
          onClick={() => router.push("/privacy-policy")}
        >
          Privacy Policy
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 w-fit cursor-pointer">
          User Agreement
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 w-fit cursor-pointer">
          Cookie Policy
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 w-fit cursor-pointer">
          About Us
        </p>
        <p className="text-sm text-slate-600 hover:text-blue-600 w-fit cursor-pointer">
          Contact Us
        </p>
      </div>

      <div className="flex justify-center pt-5 pb-5">
        <p className="text-xs">© 2025 Next Connect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ClientFooter;
