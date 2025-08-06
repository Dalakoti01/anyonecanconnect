"use client";

import React, { useState } from "react";
import { CircleAlert, IndianRupee, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setAdminJobs } from "@/redux/jobSlice";
import { useRouter, useParams } from "next/navigation";

const ReviewChanges = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { adminsJobs } = useSelector((store) => store.job);
  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const router = useRouter();
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `/api/job/reviewWork/${id}`,
        { changes: input },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(
          setAdminJobs(
            adminsJobs.map((job) =>
              job._id === res.data.job._id ? res.data.job : job
            )
          )
        );
        toast.success(res.data.success);
        router.push("/client/myJobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-[#F5F5F5] w-full h-full">
        <div className="w-full mb-10 flex justify-center">
          <div className="w-full max-w-6xl mt-10 bg-white rounded-lg shadow-xl p-4 flex flex-col gap-4 ">
            <h1 className="font-bold text-xl">Submission Revision Request</h1>
            <p className="text-slate-700">
              Please provide detailed feedback for the changes you'd like to see
              in the work{" "}
            </p>
            <div className="w-full bg-orange-100 border-l-4 border-yellow-500 px-7 py-5 flex flex-col gap-2 ">
              <div className="flex gap-3 text-yellow-700">
                <CircleAlert />
                <p className="font-bold">Important Notice : Revision Policy</p>
              </div>
              <p className="text-yellow-700">
                Please be advised that you will only have 5 days after work
                submission to request any revisions. After this 5-day period,
                the work will be automatically considered complete and payment
                will be released to the freelancer. Please note that no
                compensation or refunds will be available after this period (0%
                of your payment will be returnable).
              </p>
            </div>

            <div className="w-full bg-orange-100 border-l-4 border-yellow-500 px-7 py-5 flex flex-col gap-2 ">
              <div className="flex gap-3 text-yellow-700">
                <CircleAlert />
                <p className="font-bold">
                  Important Notice : This is your only free revision opportunity
                </p>
              </div>
              <p className="text-yellow-700">
                After submitting this revision request, you won't be able to
                request additional free changes. Make sure to include all
                necessary feedback{" "}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p>Revision Details</p>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-[250px]"
                placeholder="Describe all the changes you'd like to see in the work ..."
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="w-[150px] h-[50px] text-lg font-bold "
              >
                {" "}
                Cancel
              </Button>
              {loading ? (
                <Button className="bg-blue-700 w-[180px] h-[50px] text-lg font-bold  text-white">
                  Submitting ... <Loader2 />
                </Button>
              ) : (
                <Button
                  onClick={submitHandler}
                  variant="outline"
                  className="bg-blue-700 w-[180px] h-[50px] text-lg font-bold  text-white"
                >
                  {" "}
                  Submit Revision
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full pb-10 flex justify-center">
          <div className="max-w-6xl w-full bg-white rounded-lg shadow-xl p-5 ">
            <h1 className="font-bold text-xl">Job Details</h1>
            <div className=" mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col ">
                <p className="text-sm text-slate-700">Project</p>
                <p className="font-bold">{selectedJob?.title} </p>
              </div>

              <div className="flex flex-col ">
                <p className="text-sm text-slate-700">Freelancer</p>
                <p className="font-bold">
                  {
                    selectedJob?.application?.[0]?.applicant?.[0]?.user
                      ?.fullName
                  }{" "}
                </p>
              </div>

              <div className="flex flex-col ">
                <p className="text-sm text-slate-700">Contract Type</p>
                <p className="font-bold">{selectedJob?.budgetType}</p>
              </div>

              <div className="flex flex-col ">
                <p className="text-sm text-slate-700">Budget</p>
                <p className="flex">
                  <IndianRupee />
                  <span className="text-xl font-bold">
                    {selectedJob?.salary}
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewChanges;
