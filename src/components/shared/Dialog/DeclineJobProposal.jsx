"use client"

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/chatSlice";

const DeclineJobProposal = ({ open, setOpen, messageId }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.chat);
  const deleteJobProposal = async () => {
    try {
      const res = await axios.delete(
        `/api/message/deleteMessage/${messageId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedMessages = messages.filter((m) => m._id !== messageId);
        dispatch(setMessages(updatedMessages));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure? You Want To Decline This Job Proposal.
          </DialogTitle>
          <div className="pt-5 flex justify-center gap-7">
            <Button
              onClick={deleteJobProposal}
              variant="outline"
              className="bg-blue-600 w-[150px] text-white hover:bg-blue-700 hover:text-white"
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="w-[150px] bg-red-600 text-white hover:bg-red-700 hover:text-white"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineJobProposal;
