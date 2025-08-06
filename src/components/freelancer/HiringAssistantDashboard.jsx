"use client";

import React from "react";
import { Users } from "lucide-react";

const HiringAssistantDashboard = () => {
  return (
    <div className="w-full h-full pt-3 bg-[#fcfcfc]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl mt-10">
          <h1 className="font-bold text-2xl">Hiring Assistant Dashboard</h1>
        </div>
      </div>

      <div className="w-full mt-7 flex justify-center">
        <div className="w-full max-w-7xl bg-white rounded-lg shadow-xl px-6 py-5 flex flex-col justify-center items-center gap-3">
          <h1 className="font-bold text-xl text-center">
            Welcome to Your Hiring Assistant Dashboard
          </h1>
          <p className="text-sm text-center max-w-xl">
            You're now a Hiring Assistant! This dashboard will display your
            client cards once clients appoint you to help them find the right
            talent.
          </p>

          <div className="bg-slate-50 w-full md:w-[700px] rounded-lg shadow-md flex flex-col gap-4 p-4">
            <div className="flex gap-2 font-bold justify-center text-blue-900 items-center">
              <Users />
              <p>What to Expect as a Hiring Assistant</p>
            </div>

            {[
              {
                step: 1,
                title: "Client Discovery",
                desc: "Clients can discover and appoint you through the Hiring Assistant directory based on your expertise and experience.",
              },
              {
                step: 2,
                title: "Client Appointment",
                desc: "When a client selects you, you'll receive a notification and their card will appear on this dashboard.",
              },
              {
                step: 3,
                title: "Job Management Candidates",
                desc: "Post jobs on behalf of your clients and review applications to shortlist the best.",
              },
              {
                step: 4,
                title: "Earn Commission",
                desc: "Receive commission payments when clients successfully hire freelancers based on your recommendations.",
              },
            ].map(({ step, title, desc }) => (
              <div className="flex gap-2" key={step}>
                <div className="rounded-full h-[30px] w-[30px] flex justify-center items-center bg-blue-800 text-white text-sm font-bold">
                  {step}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-sm">{title}</p>
                  <p className="text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringAssistantDashboard;
