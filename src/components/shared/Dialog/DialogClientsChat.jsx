"use client"

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMessages } from "@/redux/chatSlice";
import { removeUserContact, setSelectedUser } from "@/redux/authSlice";

const DialogClientsChat = ({ open, setOpen, otherUserId }) => {
  const dispatch = useDispatch();
  const deleteConversation = async () => {
    try {
      const res = await axios.delete(
        `/api/message/deleteConversation/${otherUserId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);

        dispatch(setMessages([]));
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
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete all your
            chats with this freelancers and remove your data from our servers.
          </DialogDescription>
          <div className="flex justify-center gap-10">
            <Button
              onClick={() => {
                dispatch(removeUserContact(otherUserId));
                dispatch(setSelectedUser(null));
                deleteConversation;
              }}
              variant="outline"
              className="bg-blue-600 text-white"
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="bg-red-600 text-white"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogClientsChat;
