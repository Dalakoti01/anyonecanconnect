"use client"

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Clock8,
  IndianRupee,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import DeadlineCounter from "./DeadlineCounter";
import { useRouter,useParams } from "next/navigation";
import DialogSubmitWork from "./Dialog/DialogSubmitWork";

const ViewRevision = () => {
    const {id} = useParams()
  const [viewRevision, setViewRevision] = useState(false);
  const {selectedJob} = useSelector(store => store.job)
  const router = useRouter()
  const [submitWork,setSubmitWork] = useState(false)

  return (
    <div className="w-full pt-3 h-full ">
      <div className="w-full  h-full bg-[#fcfcfc]">
        <div className="w-full h-full ">
          <div className="flex justify-center items-center w-full">
            <div className="flex mt-10 w-full max-w-6xl justify-between">
              <div className="flex flex-col gap-3">
                <h1 className="font-bold text-3xl">{selectedJob?.title}</h1>
                <p className="text-slate-600 text-sm">
                  Manage revisions and continue your work{" "}
                </p>
              </div>
              <Badge variant="outline" className="h-[40px] rounded-lg bg-white">
                In Revision
              </Badge>
            </div>
          </div>

          <div className="flex justify-center mt-7 w-full">
            <div className="w-full max-w-6xl items-start  flex justify-between gap-5 ">
              <div className="w-2/3 mb-10  bg-white pb-[200px] rounded-lg p-4 flex flex-col gap-4">
                <div className="flex justify-between ">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-xl">Project Overview</h1>
                    <p className="text-sm text-slate-600">
                      Current Project Overview
                    </p>
                  </div>
                  <Button variant="outline">View Full Project</Button>
                </div>

                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-slate-500">Client Name</p>
                    <p className="font-bold">{selectedJob?.owner?.fullName}</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-bold">{selectedJob?.freelancerReviewDeadline?.split("T")?.[0]}</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-slate-500">Budget</p>
                    <p className="font-bold flex gap-1">
                      <IndianRupee />
                      <span>{selectedJob?.salary}</span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-slate-500">Contract Type</p>
                    <p className="font-bold">{selectedJob?.budgetType}</p>
                  </div>
                </div>
              </div>

              <div className="w-1/3 bg-white pb-9 rounded-lg p-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold text-xl">Actions</h1>
                  <p className="text-sm text-slate-500">
                    Respond to revision details
                  </p>
                </div>
                <Button
                  className="flex justify-between font-bold bg-slate-100"
                  variant="outline"
                >
                  <span className="flex gap-2">
                    <Clock8 /> Time Logged
                  </span>{" "}
                  <span className="font-bold"><DeadlineCounter deadlineISO={selectedJob?.freelancerReviewDeadline} />
</span>{" "}
                </Button>

                <Button onClick={() => setSubmitWork(true)} className="bg-blue-700 text-white" variant="outline">
                  Submit Completed Work{" "}
                </Button>
                <Button variant="outline">Request Clarification</Button>
<DialogSubmitWork open={submitWork} setOpen={setSubmitWork} job={id}/>
                <div className="bg-orange-50 text-orange-500 p-2 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <CircleAlert />
                    <p>Revision Policy</p>
                  </div>

                  <p className="text-sm">
                    Revision policy: to maintain the good rank you have to
                    resubmit completed work within 4 days after client
                    send those revision
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-7 flex justify-center">
            <div className="w-full max-w-6xl mb-10 bg-white rounded-lg p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Revision Requests</h1>
                <p className="text-sm">Client Feedback And Requested Changes</p>
              </div>

              <Button className="w-[150px]" variant="outline">
                Revison Details
              </Button>

              <div
                onClick={() => setViewRevision(!viewRevision)}
                className="border-l-4 mb-5 cursor-pointer border-blue-700 p-3 rounded-lg bg-white "
              >
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">
                        Revision Requested By {selectedJob?.owner?.fullName}{" "}
                      </p>
                      <p className="text-sm text-slate-500">May 22 ,2025</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className="flex gap-1 rounded-lg h-[40px] bg-orange-100 text-orange-500 "
                      variant="outline"
                    >
                      <Clock8 /> Pending
                    </Badge>
                    {viewRevision ? <ChevronDown /> : <ChevronUp />}
                    
                  </div>
                  
                </div>
                {viewRevision && (
                      <div className="mt-5 flex flex-col gap-4">
                        <p className="font-bold">Request Changes :</p>
                        <p>
                          {selectedJob?.reviewChanges}
                        </p>

                        <div className="flex justify-end gap-4">
<Button variant="outline">Request Clarification</Button>
<Button variant ="outline" className="bg-blue-700 text-white">Mark As Adrresed</Button>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewRevision;
