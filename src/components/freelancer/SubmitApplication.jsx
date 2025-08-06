"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { updateSingleJob } from "@/redux/jobSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import { IndianRupee, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Proposal_Draft_Key = "proposal_draft";

export default function SubmitApplication() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedJob } = useSelector((state) => state.job);
  const [option, setOptions] = useState(false);
  const [savedLink, setSavedLink] = useState("");
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    coverLetter: "",
    yourApproach: "",
    estimatedTimeLine: "",
    yourBid: "",
    portfolio: "",
    questionsForClient: "",
    paymentDeliveryTerms: "",
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem(Proposal_Draft_Key);
    if (savedDraft) setInput(JSON.parse(savedDraft));
  }, []);

  const saveAsDraft = () => {
    try {
      localStorage.setItem(Proposal_Draft_Key, JSON.stringify(input));
      toast.success("Job Proposal saved as a draft");
    } catch (error) {
      toast.error("Could not save draft");
    }
  };

  const handleSaveLink = () => {
    if (input.portfolio.trim() !== "") setSavedLink(input.portfolio.trim());
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/application/applyJobs/${id}`, input, {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.removeItem(Proposal_Draft_Key);
        dispatch(updateSingleJob(res.data.job));
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        router.push("/freelancer/find-jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl bg-slate-50 mt-10 rounded-lg mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{selectedJob?.title}</h1>
        <Badge className="bg-blue-300">2500</Badge>
      </div>

      <div className="flex gap-6 border-b pb-4">
        {[
          { label: "Posted", value: selectedJob?.createdAt?.split("T")[0] },
          { label: "Duration", value: selectedJob?.duration },
          { label: "Experience Level", value: "2 days ago" },
          { label: "Location", value: "Remote" },
        ].map((item, idx) => (
          <div key={idx} className="space-y-1">
            <h2 className="font-semibold">{item.label}</h2>
            <p className="text-sm text-gray-500">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedJob?.skills?.map((skill, i) => (
          <Badge key={i} className="bg-blue-200 text-blue-600">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="bg-blue-100 p-4 border-l-4 border-blue-600">
        <h2 className="text-blue-700 font-bold">Tips for a Great Proposal</h2>
        <ul className="text-sm list-disc pl-5 space-y-1 mt-2">
          <li>Highlight relevant experience and skills</li>
          <li>Include a personalized approach</li>
          <li>Set expectations about timeline and deliverables</li>
          <li>Ask thoughtful questions</li>
        </ul>
      </div>

      {/* Cover Letter */}
      <div className="space-y-2">
        <label>Cover Letter</label>
        <Textarea
          value={input.coverLetter}
          onChange={(e) => setInput({ ...input, coverLetter: e.target.value })}
          placeholder="Why you're a good fit..."
        />
      </div>

      {/* Your Approach */}
      <div className="space-y-2">
        <label>Your Approach</label>
        <Textarea
          value={input.yourApproach}
          onChange={(e) => setInput({ ...input, yourApproach: e.target.value })}
          placeholder="How will you execute this project..."
        />
      </div>

      {/* Timeline & Bid */}
      <div className="flex gap-4">
        <div className="w-1/2 space-y-2">
          <label>Estimated Timeline</label>
          <Select
            value={input.estimatedTimeLine}
            onValueChange={(value) =>
              setInput((prev) => ({ ...prev, estimatedTimeLine: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Timeline..." />
            </SelectTrigger>
            <SelectContent>
              {[
                "less than a week",
                "1 to 2 week",
                "2 to 3 week",
                "3 to 4 week",
                "1 to 3 month",
                "3 to 6 month",
                "more than 6 months",
              ].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/2 space-y-2">
          <label>Your Bid</label>
          <div className="relative">
            <IndianRupee className="absolute left-2 top-2 text-gray-400" />
            <Input
              className="pl-8"
              value={input.yourBid}
              onChange={(e) => setInput({ ...input, yourBid: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="space-y-2">
        <label>Your Portfolio</label>
        <Input
          placeholder="Portfolio link"
          value={input.portfolio}
          onChange={(e) => setInput({ ...input, portfolio: e.target.value })}
        />
        <Button onClick={handleSaveLink} className="w-fit">
          Save Link
        </Button>
        {savedLink && (
          <a
            href={savedLink}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Portfolio
          </a>
        )}
      </div>

      <Button
        className="w-fit"
        variant="outline"
        onClick={() => setOptions(!option)}
      >
        Advanced Options
      </Button>

      {option && (
        <div className="bg-slate-100 p-5 rounded space-y-4">
          <div className="space-y-2">
            <label>Questions for Client</label>
            <Textarea
              value={input.questionsForClient}
              onChange={(e) =>
                setInput({ ...input, questionsForClient: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label>Project Delivery Terms</label>
            <div className="flex flex-wrap gap-4">
              {["Fixed Price", "Milestone Payments", "Hourly Rate"].map(
                (term) => (
                  <Badge
                    key={term}
                    onClick={() =>
                      setInput({ ...input, paymentDeliveryTerms: term })
                    }
                    className={`cursor-pointer px-3 py-2 text-sm ${
                      input.paymentDeliveryTerms === term
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black border"
                    }`}
                  >
                    {term}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button onClick={saveAsDraft} variant="outline">
          Save Draft
        </Button>

        {loading ? (
          <Button className="bg-blue-700 text-white hover:bg-blue-800">
            Submiting ... <Loader2 className="animate-spin h-4 w-4" />{" "}
          </Button>
        ) : (
          <Button
            onClick={submitHandler}
            className="bg-blue-700 text-white hover:bg-blue-800"
          >
            Submit Application
          </Button>
        )}
      </div>
    </div>
  );
}
