"use client"

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMessages } from "@/redux/chatSlice";
import axios from "axios";

const FreelancerAcceptBreif = ({ open, setOpen }) => {
  const { selectProjectBrief } = useSelector((store) => store.job);
  const { selectedUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loadin, setLoading] = useState(false);
  const { messages } = useSelector((store) => store.chat);

  const submitProjectBrief = async () => {
    try {
      setLoading(true);
      console.log(selectProjectBrief);

      const body = {
        title: selectProjectBrief.title,
        description: selectProjectBrief.description,
        delivarables: selectProjectBrief.delivarables,
        salary: selectProjectBrief.salary,
        budgetType: selectProjectBrief.budgetType,
        duration: selectProjectBrief.duration,
      };
      const res = await axios.post(
        `/api/job/proposeJob/${selectedUser?._id}`,
        body,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setMessages([...messages, res.data.messageData]));
        console.log(messageData);

        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <div className="flex justify-around w-full pt-7 ">
            <Button
              variant="outline"
              onClick={submitProjectBrief}
              className="w-1/3 bg-green-700 text-white"
            >
              Yes
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-1/3 bg-yellow-300 text-black"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FreelancerAcceptBreif;
