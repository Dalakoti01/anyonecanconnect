"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelectedJob, updateAdminJob } from "@/redux/jobSlice";
import toast from "react-hot-toast";

const DialogTakeAction = ({ job, open, setOpen, setShowReviewDialog }) => {
  const dispatch = useDispatch();
  const [decision, setDecision] = useState("");


  const submitHandler = async () => {
    try {
      const res = await axios.put(
        `/api/job/${job}/feedBackStatus`,
        { action: decision },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(updateAdminJob(res.data.job));
        dispatch(setSelectedJob(res.data.job))
        toast.success(res.data.message);

        if (decision === "accept") {
          setShowReviewDialog(true);
          setTimeout(() => {
            setOpen(false);
          }, 100); // small delay (100ms)
        } else {
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Action Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="flex flex-col gap-6">
            <h1 className="font-bold text-xl text-gray-800">
              This action cannot be undone
            </h1>

            <div className="flex flex-col gap-4 pl-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="redo"
                  checked={decision === "redo"}
                  onChange={(e) => setDecision(e.target.value)}
                  className="cursor-pointer"
                />
                <span className="text-gray-700">
                  Accept With Review Changes
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="accept"
                  checked={decision === "accept"}
                  onChange={(e) => setDecision(e.target.value)}
                  className="cursor-pointer"
                />
                <span className="text-gray-700">Accept Work</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="action"
                  value="incomplete"
                  checked={decision === "incomplete"}
                  onChange={(e) => setDecision(e.target.value)}
                  className="cursor-pointer"
                />
                <span className="text-gray-700">
                  Incomplete Work 
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={submitHandler}
                variant="outline"
                className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white w-fit"
                disabled={!decision}
              >
                Finalize Submission
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
    </>
  );
};

export default DialogTakeAction;
