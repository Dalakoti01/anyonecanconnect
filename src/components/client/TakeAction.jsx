"use client";

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import {
  CircleAlert,
  CircleCheckBig,
  IndianRupee,
  Mail,
  Recycle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import DialogAcceptWork from "./Dialog/DialogAcceptWork";
import DialogRejectWork from "./Dialog/DialogRejectWork";

const TakeAction = () => {
  const { id } = useParams();
  const router = useRouter();
  const { selectedJob } = useSelector((store) => store.job);
  const [acceptDialog, setAcceptDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  return (
    <div className="w-full h-full ">
      <div className="w-full h-full bg-[#F5F5F5]">
        <div className="w-full flex justify-center ">
          <div className="w-full mb-10 mt-10 p-5 max-w-6xl bg-white rounded-lg shadow-xl flex flex-col gap-2">
            <div className="flex justify-between ">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">{selectedJob?.title}</h1>
                <p className="text-slate-600">
                  Review and take action on the submitted work{" "}
                </p>
              </div>
              <Badge
                variant="outline"
                className="rounded-xl h-[30px] bg-orange-300 text-orange-700"
              >
                Pending Review
              </Badge>
            </div>

            <div className="w-full bg-orange-100 border-l-4 border-yellow-500 px-7 py-5 flex flex-col gap-2 ">
              <div className="flex gap-3 text-yellow-700">
                <CircleAlert />
                <p className="font-bold text-sm">
                  Important Notice : Revision Policy
                </p>
              </div>
              <p className="text-yellow-700 text-sm">
                Please be advised that you will only have 5 days after work
                submission to request any revisions. After this 5-day period,
                the work will be automatically considered complete and payment
                will be released to the freelancer. Please note that no
                compensation or refunds will be available after this period (0%
                of your payment will be returnable).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-700">Freelancer</p>
                <div className="flex gap-1">
                  <Avatar>
                    <AvatarImage
                      src={
                        selectedJob?.application?.[0]?.applicant?.[0]?.user
                          ?.profile?.profilePhoto
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="mt-2">
                    {
                      selectedJob?.application?.[0]?.applicant?.[0]?.user
                        ?.fullName
                    }
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-700">Contract Type</p>
                <p className="text-sm">{selectedJob?.budgetType}</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-700">Budget</p>
                <p className="text-sm flex">
                  <IndianRupee />{" "}
                  <span className="font-bold text-xl">
                    {selectedJob?.salary}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-slate-700">Due Date</p>
                <p className="text-sm">
                  {selectedJob?.clientReviewDeadline &&
                    new Date(
                      selectedJob.clientReviewDeadline
                    ).toLocaleDateString()}{" "}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <p className="font-bold">Avaialable Action</p>
              <div className=" w-full  flex justify-between gap-3">
                {selectedJob?.reviewChance ? (
                  ""
                ) : (
                  <div
                    onClick={() => router.push(`/client/reviewChanges/${id}`)}
                    className="bg-white rounded-lg h-[100px] cursor-pointer  flex-1 border-2 border-blue-600 text-blue-700 flex gap-3 justify-center items-center p-3"
                  >
                    <Recycle />
                    <div className="flex flex-col">
                      <p className="text-xl font-bold">
                        Resubmit For Improvements
                      </p>
                      <p className="text-sm">Request Changes to the work</p>
                    </div>
                  </div>
                )}

                <div
                  onClick={() => setAcceptDialog(true)}
                  className="bg-white cursor-pointer flex-1 border-2 rounded-lg border-green-600 text-green-700 flex gap-3 justify-center items-center p-3"
                >
                  <CircleCheckBig />{" "}
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">Accept Work</p>
                    <p className="text-sm">Mark the Work as Completed</p>
                  </div>
                </div>

                <div
                  onClick={() => setRejectDialog(true)}
                  className="bg-white cursor-pointer flex-1 border-2 border-red-600 rounded-lg text-red-700 flex gap-3 justify-center items-center p-3"
                >
                  <CircleAlert />{" "}
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">Mark As Incomplete</p>
                    <p className="text-sm">Work Does'nt meet requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogAcceptWork open={acceptDialog} setOpen={setAcceptDialog} />
            <DialogRejectWork open={rejectDialog} setOpen={setRejectDialog} />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Submission Preview</h1>
              <div className="w-full p-7 bg-white rounded-lg border-2 border-slate-200 flex flex-col gap-4 justify-center items-center">
                <div className="rounded-full  bg-slate-100 p-6 ">
                  <Mail size={"40px"} />
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <p className="font-bold">Work Submission sent via Email</p>
                  <p className="text-sm text-slate-700">
                    The submitted work has been shared with you via email.
                    Please check your inbox. If you can't find it, make sure to
                    check your spam folder.
                  </p>
                </div>
                <div className="flex cursor-pointer p-3 items-center justify-center rounded-lg gap-2 border-2 border-slate-600">
                  <Recycle />
                  Resend Work Submission
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAction;
