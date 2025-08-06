"use client"

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setSelectedJob } from "@/redux/jobSlice";
import toast from "react-hot-toast";
import { Badge } from "../../ui/badge";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { IndianRupee, Loader2 } from "lucide-react";
import store from "@/redux/store";
import { updateSingleApplication } from "@/redux/applicationSlice";

const DialogEditApplication = ({ open, setOpen, application }) => {
  const { selectedJob } = useSelector((store) => store.job);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [option, setOptions] = useState(false);
  const { selectedApplication } = useSelector((store) => store.application);
  const [input, setInput] = useState({
    coverLetter: selectedApplication?.applicant[0]?.coverLetter || "",
    yourApproach: selectedApplication?.applicant[0]?.yourApproach || "",
    estimatedTimeLine:
      selectedApplication?.applicant[0]?.estimatedTimeLine || "",
    yourBid: selectedApplication?.applicant[0]?.yourBid || "",
    portfolio: selectedApplication?.applicant[0]?.portfolio || "",
    questionsForClient:
      selectedApplication?.applicant[0]?.questionsForClient || "",
    paymentDeliveryTerms:
      selectedApplication?.applicant[0]?.paymentDeliveryTerms || "",
  });
  const [savedLink, setSavedLink] = useState("");

  useEffect(() => {
    if (open && selectedApplication) {
      setInput({
        coverLetter: selectedApplication?.applicant[0]?.coverLetter || "",
        yourApproach: selectedApplication?.applicant[0]?.yourApproach || "",
        estimatedTimeLine:
          selectedApplication?.applicant[0]?.estimatedTimeLine || "",
        yourBid: selectedApplication?.applicant[0]?.yourBid || "",
        portfolio: selectedApplication?.applicant[0]?.portfolio || "",
        questionsForClient:
          selectedApplication?.applicant[0]?.questionsForClient || "",
        paymentDeliveryTerms:
          selectedApplication?.applicant[0]?.paymentDeliveryTerms || "",
      });
    }
  }, [open, selectedApplication]);
  const submitHandler = async () => {
    try {
      setLoading(true);
      const body = {
        coverLetter: input.coverLetter,
        yourApproach: input.yourApproach,
        estimatedTimeLine: input.estimatedTimeLine,
        yourBid: input.yourBid,
        portfolio: input.portfolio,
        questionsForClient: input.questionsForClient,
        paymentDeliveryTerms: input.paymentDeliveryTerms,
      };
      console.log(input);
      console.log("job id :", selectedJob?._id);

      const res = await axios.post(
        `/api/application/updateApplication/${application}`,
        body,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(updateSingleApplication(res.data.application));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLink = () => {
    if (input.portfolio.trim() !== "") {
      setSavedLink(input.portfolio.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">
          Hidden Trigger
        </Button>
      </DialogTrigger>

      {/* ✅ Centered Dialog */}
      <DialogContent className="max-w-3xl  bg-white shadow-lg p-6 rounded-lg max-h-[80vh] overflow-y-auto">
        <div className="bg-white p-5 rounded-xl flex flex-col gap-5">
          <div className="flex justify-between">
            <h1 className=" font-bold text-xl">{selectedJob?.title}</h1>
            <Badge
              variant="outline"
              className="rounded-lg p-3 h-[30px] bg-blue-300"
            >
              2500
            </Badge>
          </div>

          <div className="flex gap-7 border-b-2 border-slate-300 pb-5">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">Posted</h1>
              <p className="text-slate-500 text-sm">
                {selectedJob?.createdAt.split("T")[0]}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="font-bold">Duration</h1>
              <p className="text-slate-500 text-sm">{selectedJob?.duration}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="font-bold">Experience Level</h1>
              <p className="text-slate-500 text-sm">2 days ago</p>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="font-bold">Location</h1>
              <p className="text-slate-500 text-sm">2 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 pb-5 border-b-2 border-slate-200">
            {selectedJob?.skills?.map((skill, index) => (
              <div key={index} className=" ">
                <Badge
                  variant="outline"
                  className="h-[30px] bg-blue-200 text-blue-600"
                >
                  {skill}
                </Badge>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-200 border-l-4 border-blue-700 flex flex-col gap-5">
            <h1 className="font-bold text-blue-700">
              Tips for a Great Proposal
            </h1>
            <p className="text-sm">
              Clients are more likely to respond when you:
            </p>
            <div className="flex flex-col text-xs gap-2">
              <p> Highlight relevant experience and skills</p>
              <p> Include a personalized approach to their project</p>
              <p> Set clear expectations about timeline and deliverables</p>
              <p> Ask thoughtful questions about their requirements</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold">Your Proposal</h1>
            <p className="text-sm">
              Write a personalized message explaining why you're the best fit
              for this project. Be specific about your skills and experience
              related to the client's needs.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Cover Letter</h1>
            <Textarea
              onChange={(e) =>
                setInput({ ...input, coverLetter: e.target.value })
              }
              value={input.coverLetter}
              placeholder="Introduce yourself and explain why you are perfect for this project"
              className="min-h-40 border-blue-400"
            />
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">
                Min. 150 characters required
              </p>
              <p className="text-sm text-slate-500">0/3000</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Your Approach</h1>
            <Textarea
              onChange={(e) =>
                setInput({ ...input, yourApproach: e.target.value })
              }
              value={input.yourApproach}
              placeholder="Describe your approach in completing this project ... "
              className="min-h-40 border-blue-400"
            />
            <div className="flex justify-between">
              <p className="text-sm text-slate-500">
                Be specific about methodology
              </p>
              <p className="text-sm text-slate-500">0/2000</p>
            </div>
          </div>

          <div className="flex w-full gap-5">
            <div className="flex flex-col gap-2">
              <h1>Estimated Timeline</h1>
              <Select
                value={input.estimatedTimeLine}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, estimatedTimeLine: value }))
                }
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Timeline ..." />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  <SelectItem
                    className="cursor-pointer"
                    value="less than a week"
                  >
                    Less than 1 week
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="1 to 2 week">
                    1 - 2 weeks
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="2 to 3 week">
                    2 - 3 weeks
                  </SelectItem>

                  <SelectItem className="cursor-pointer" value="3 to 4 week">
                    3 - 4 weeks
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="1 to 3 month">
                    1 - 3 month
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="3 to 6 month">
                    3 - 6 month
                  </SelectItem>
                  <SelectItem
                    className="cursor-pointer"
                    value="more than 6 months"
                  >
                    More than 6 months
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1>Your Bid</h1>
              <div className="relative w-[380px]">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  value={input.yourBid}
                  onChange={(e) =>
                    setInput({ ...input, yourBid: e.target.value })
                  }
                  name="salary"
                  className="w-full pl-8 border-blue-600"
                />
              </div>{" "}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Your Portfolio</h1>
            <Input
              type="text"
              placeholder="Enter your portfolio link"
              value={input.portfolio}
              onChange={(e) =>
                setInput({ ...input, portfolio: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2"
            />

            <Button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-fit"
              onClick={handleSaveLink}
            >
              Save Link
            </Button>

            {savedLink && (
              <a
                href={savedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-1"
              >
                View Portfolio
              </a>
            )}
          </div>

          <Button
            className="w-[140px] text-blue-600"
            onClick={() => setOptions((prev) => !prev)}
            variant="outline"
          >
            Advanced Options
          </Button>
          {option && (
            <div className="bg-slate-100 rounded-lg p-7 flex flex-col gap-4 ">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Questions for Client</h1>
                <Textarea
                  onChange={(e) =>
                    setInput({ ...input, questionsForClient: e.target.value })
                  }
                  value={input.questionsForClient}
                  placeholder="What questions do you have about the project?"
                  className="border-blue-500 h-[100px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Project Delivery Terms</h1>
                <div className="flex w-full gap-5">
                  {[
                    {
                      label: "Fixed Price",
                      description:
                        "One payment upon completion of all deliverables",
                    },
                    {
                      label: "Milestone Payments",
                      description:
                        "Multiple payments upon completion of predefined milestones",
                    },
                    {
                      label: "Hourly Rate",
                      description:
                        "Pay based on tracked hours at an agreed hourly rate",
                    },
                  ]?.map((option) => (
                    <Badge
                      key={option.label}
                      onClick={() =>
                        setInput({
                          ...input,
                          paymentDeliveryTerms: option.label,
                        })
                      }
                      className={`cursor-pointer transition-all ${
                        input.paymentDeliveryTerms === option.label
                          ? "bg-blue-600 text-white border border-blue-600"
                          : "bg-white text-black border border-gray-300"
                      }`}
                      variant="outline"
                    >
                      <div className="flex flex-col gap-2 px-2 py-1 text-sm">
                        <p className="text-center font-medium">
                          {option.label}
                        </p>
                        <p className="text-center text-slate-800">
                          {option.description}
                        </p>
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-end mt-5">
              <Button
                variant="outline"
                className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
              >
                <Loader2 className="animate-spin mr-2 h-2 w-2" />
                Please Wait
              </Button>
            </div>
          ) : (
            <div className="flex justify-end mt-5">
              {selectedApplication?.status === "pending" && (
                <Button
                  onClick={submitHandler}
                  className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                  variant="outline"
                >
                  Update Proposals
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditApplication;
