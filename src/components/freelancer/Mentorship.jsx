"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Clock, Laptop, User, UserPen } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";

const Mentorship = () => {
  const { user } = useSelector((store) => store.auth);
  const [applied, setApplied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMentorshipStatus = async () => {
      try {
        const res = await axios.get(`/api/user/getMentorship`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setApplied(true);
        } else {
          setApplied(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMentorshipStatus();
  }, [user]);

  const getNotify = () => {
    toast.success("You Will Be Notified");
  };

  return (
    <div className="w-full min-h-screen h-full pt-5 bg-[#fcfcfc] px-4">
      <div className="w-full max-w-7xl pt-5 mx-auto">
        <h1 className="font-bold text-xl text-left">Mentorship</h1>
      </div>

      <div className="w-full max-w-7xl mb-5 text-left mx-auto">
        <p className="text-sm">
          Connect With the industry experts to accelerate your career growth
        </p>
      </div>

      <div className="w-full flex justify-center mx-auto">
        <div className="w-full border-s-2 bg-white max-w-7xl border-blue-600 rounded-xl p-5 flex flex-col items-center justify-center gap-4">
          <div className="text-blue-700 w-[60px] flex justify-center bg-blue-200 rounded-full p-5">
            <Clock />
          </div>
          <h1 className="font-bold text-xl text-center">
            Mentorship Program Coming Soon!
          </h1>
          <p className="max-w-2xl text-slate-700 text-sm text-justify">
            We are working hard to bring you a comprehensive mentorship platform
            that connects professionals with the industry expert. Be the first
            to know when we launch!
          </p>
          <Button onClick={getNotify} className="bg-blue-700 text-white" variant="outline">
            Get Notified
          </Button>
        </div>
      </div>

      <div className="w-full mt-4 max-w-7xl mx-auto">
        <h1 className="font-bold text-left">What to expect</h1>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg rounded-md flex flex-col gap-5 p-5">
          <User className="text-blue-600" />
          <h1 className="font-bold">Expert Mentors</h1>
          <p>
            Connect with the verified professionals who have proven expertise
            in your field of interest
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-md flex flex-col gap-5 p-5">
          <UserPen className="text-blue-600" />
          <h1 className="font-bold">Personalized Guidance</h1>
          <p>
            Receive customized advice and feedback to help you reach your
            professional goals
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-md flex flex-col gap-5 p-5">
          <Laptop className="text-blue-600" />
          <h1 className="font-bold">Flexible Sessions</h1>
          <p>
            Schedule one-time consultations or ongoing mentorship based on your
            needs and availability
          </p>
        </div>
      </div>

      <div className="w-full mt-5 mb-5 max-w-7xl mx-auto bg-white rounded-md p-4 flex flex-col md:flex-row justify-between gap-5 md:items-center">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold">Interested in becoming a mentor?</h1>
          <p>
            Share your experience and help grow others while expanding your
            professional network
          </p>
        </div>
        {applied ? (
          <Button variant="outline" className="bg-yellow-400 text-white">
            Pending
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/freelancer/joinAsMentor")}
            className="bg-blue-700 text-white"
            variant="outline"
          >
            Join As A Mentor
          </Button>
        )}
      </div>
    </div>
  );
};

export default Mentorship;
