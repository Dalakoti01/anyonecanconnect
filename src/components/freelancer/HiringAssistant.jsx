"use client";

import React from "react";
import {
  BookCheck,
  Briefcase,
  DollarSign,
  IndianRupee,
  Star,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HiringAssistant = () => {
  const router = useRouter();

  return (
    <div className="w-full pt-5 h-full bg-[#fcfcfc]">
      <div className="w-full min-h-screen h-full">
        <div className="w-full h-full flex justify-center">
          <div className="mt-10 max-w-7xl w-full flex justify-center gap-5">
            <div className="rounded-full bg-blue-200 text-blue-600 flex justify-center items-center p-4">
              <Briefcase />
            </div>
            <div className="rounded-full bg-blue-200 text-blue-600 flex justify-center items-center p-4">
              <DollarSign />
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-center mt-10">
          <div className="max-w-xl w-full flex flex-col gap-5">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl text-center">
                Welcome To Your Hiring Assistant Portal
              </h1>
            </div>
            <div className="flex justify-center">
              <p className="text-sm text-center">
                You're on your way to becoming a Hiring Assistant. Let's ensure
                you meet all requirements to start connecting with clients.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-center mt-10">
          <div className="flex pb-10 flex-col gap-5 max-w-7xl w-full">
            {/* Eligibility */}
            <div className="w-full bg-white rounded-lg shadow-xl p-4">
              <h1 className="mb-3 font-bold">Eligibility Requirements</h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <div className="rounded-full bg-green-200 text-green-600 p-2 h-[40px] flex justify-center items-center">
                    <Star />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Minimum Rating</p>
                    <p>Maintain a rating of 4.5+ on your freelance work</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full bg-green-200 text-green-600 p-2 h-[40px] flex justify-center items-center">
                    <BookCheck />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Completed Projects</p>
                    <p>Minimum 10 successful projects</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full bg-green-200 text-green-600 p-2 h-[40px] flex justify-center items-center">
                    <Briefcase />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Experience</p>
                    <p>At least 2 years of freelancing experience</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="rounded-full bg-green-200 text-green-600 p-2 h-[40px] flex justify-center items-center">
                    <Users />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Client Feedback</p>
                    <p>Positive feedback from at least 5 clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earning Potential */}
            <div className="w-full bg-white rounded-lg shadow-xl p-4">
              <h1 className="font-bold text-xl mb-3">Earning Potential</h1>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="p-4 bg-slate-200 h-[120px] rounded-lg w-full sm:w-[220px] md:w-[300px] lg:w-[380px] flex flex-col justify-center items-center"
                  >
                    <div className="flex font-bold text-2xl text-blue-600">
                      <IndianRupee />
                      500
                    </div>
                    <p className="text-sm text-center">
                      Base fee per successful hire
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="w-full bg-blue-100 rounded-lg shadow-xl p-4 flex flex-col gap-3">
              <p className="font-bold text-xl">Next Steps</p>
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex gap-1">
                  <div className="flex justify-center w-[30px] h-[30px] items-center bg-blue-300 rounded-full">
                    <p>{step}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">Complete Verification</p>
                    <p>Submit your documents and identity verification</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push("/freelancer/applyHiringForm")}
              variant="outline"
              className="bg-blue-700 py-7 text-xl font-bold text-white hover:bg-blue-800 hover:text-white"
            >
              Start Verification Process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringAssistant;
