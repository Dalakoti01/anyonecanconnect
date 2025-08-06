"use client"

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import RatingStars from "../shared/RatingStars";
import { Button } from "../ui/button";
import { IndianRupee } from "lucide-react";

const CompletedJob = () => {
  const { selectedJob } = useSelector((store) => store.job);
  const [options, setOptions] = useState("details");

  return (
    <div className="w-full pt-3 h-screen">
      <div className="w-full  h-full  bg-[#fcfcfc]  ">
        <div className="flex py-10 justify-center w-full h-screen ">
          <div className="w-full h-full bg-white rounded-xl max-w-7xl shadow-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between border-b-2 border-slate-200 pb-5">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{selectedJob?.title}</h1>
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={selectedJob?.owner?.profile?.profilePhoto}
                    />
                    <AvatarFallback>
                      {selectedJob?.owner?.fullName
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>{selectedJob?.owner?.fullName}</p>
                </div>
              </div>

              <Badge className="h-[30px]" variant="outline">
                {selectedJob?.status}
              </Badge>
            </div>
            <div className={` flex mt-4 gap-5 w-full border-b-2 border-slate-200 pb-2`}>
              <h1
                onClick={() => setOptions("details")}
                className={`${options === "details" ? "pb-1 border-b-4 border-blue-500" : ""} cursor-pointer`}
              >
                Details
              </h1>
              <h1
                onClick={() => setOptions("delivarables")}
                className={`${options === "delivarables" ? "pb-1 border-b-4 border-blue-500" : ""} cursor-pointer`}
              >
                Deliverables
              </h1>
              {/* <h1
                onClick={() => setOptions("milestones")}
                className="cursor-pointer"
              >
                Milestones
              </h1>
              <h1
                onClick={() => setOptions("messages")}
                className="cursor-pointer"
              >
                Messages
              </h1> */}
            </div>
            {options === "details" ? (
              <div className="flex flex-col">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <h1 className="font-bold">Contract Type :</h1>
                      <h1>Fixed Price</h1>
                    </div>

                    <div className="flex gap-2">
                      <h1 className="font-bold">Budget :</h1>
                      <div className="flex items-center ">
<IndianRupee className="w-4 h-4"/>
                      <h1>{selectedJob?.salary}</h1>

                      </div>
                    </div>

                    <div className="flex gap-2">
                      <h1 className="font-bold">Start Date :</h1>
                      <h1>
                        {selectedJob?.createdAt &&
                          new Date(selectedJob?.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              timeZone: "Asia/Kolkata",
                            }
                          )}
                      </h1>{" "}
                    </div>

                    <div className="flex gap-2">
                      {selectedJob?.status === "completed" ? (
                        <h1 className="font-bold">Completion Date :</h1>
                      ) : (
                        <h1 className="font-bold">Deadline : </h1>
                      )}
                      {selectedJob?.status === "completed" ? (
<h1>
                          {new Date(
                            selectedJob?.completionDate
                          )?.toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </h1>                      ) : (
                        <h1>
                          {new Date(
                            selectedJob?.applicationDeadline
                          )?.toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </h1>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-7">
                      <h1 className="font-bold">Advance Payment :</h1>
                      <h1>Paid</h1>
                    </div>
                    <div className="flex gap-2">
                      <h1 className="font-bold">Advance Payment Date :</h1>
<h1>
  {selectedJob?.paymentStatus?.advancePaidAt
    ? new Date(selectedJob.paymentStatus.advancePaidAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
    : "Not Paid"
  }
</h1>                    </div>
                    <div className="flex gap-2">
                      <h1 className="font-bold">Final Payment :</h1>
                      {selectedJob?.paymentStatus?.finalPaid ? 
                        <h1>Paid</h1> : <h1>Pending</h1>}
                      <h1></h1>
                    </div>
                  <div className="flex gap-2">
  <h1 className="font-bold">Final Date :</h1>
  <h1>
    {selectedJob?.paymentStatus?.finalPaid && selectedJob?.paymentStatus?.finalPaidAt
      ? new Date(selectedJob.paymentStatus.finalPaidAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })
      : "Final Payment Not Done"
    }
  </h1>
</div>
                  </div>
                </div>
                <div className="flex flex-col mt-5 gap-5">
                  <h1 className="text-blue-600">Project Description</h1>
                  <p>{selectedJob?.description}</p>
                </div>

                <div className="flex mt-5 flex-col gap-4">
                  <h1 className="text-blue-600">Client Feedback</h1>
                  {selectedJob?.reviewGiven?.byFreelancer ? (
                    <div className="bg-slate-200 rounded-md p-4 flex flex-col gap-3">
                      <RatingStars rating={5} />
                      <p>
                        "Exceptional work! The designer understood exactly what
                        our startup needed. The logo perfectly captures our
                        brand's identity and the multiple concepts gave us
                        plenty of options to choose from. Delivered ahead of
                        schedule and was very responsive to feedback. Would
                        definitely hire again!"
                      </p>
                    </div>
                  ) : (
                    <p>No review given yet</p>
                  )}
                </div>

                <div className="flex gap-4 mt-5">
                  <Button variant="outline">Download Files</Button>
                  <Button
                    variant="outline"
                    className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                  >
                    Request Testimonial
                  </Button>
                </div>
              </div>
            ) : options === "delivarables" ? (
              <div className="flex mt-5 flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <h1 className="text-blue-600">Final Delivarable</h1>
                  <p>
                    The following files have been delivered and approved by the
                    client:
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Button variant="outline">LogoAi Main</Button>
                    <Button variant="outline">LogoAi Main</Button>
                    <Button variant="outline">LogoAi Main</Button>
                    <Button variant="outline">LogoAi Main</Button>
                    <Button variant="outline">LogoAi Main</Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h1 className="text-blue-600">Usage Rights</h1>
                    <p>
                      The client has been granted full commercial usage rights
                      for all delivered files. The designer retains the right to
                      showcase the work in their portfolio.
                    </p>
                  </div>
                </div>
              </div>
            ) : options === "milestones" ? (
              <div className=""></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedJob;
