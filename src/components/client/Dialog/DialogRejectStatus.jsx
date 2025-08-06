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
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DialogRejectStatus = ({ open, setOpen, app }) => {
  const router = useRouter()
  const rejectStatus = async () => {
    try {
      const res = await axios.post(
        `/api/application/updateStatus/${app?._id}`,
        { status: "rejected" },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Are you absolutely sure?
          </DialogTitle>
          <div className=" pt-5 flex justify-center gap-10">
            <Button
              onClick={() => {
                rejectStatus();
                setOpen(false);
                router.push("/client/myJobs")
              }}
              variant="outline"
              className="bg-blue-700 w-[100px] text-white"
            >
              Yes
            </Button>

            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="bg-red-700 w-[100px] text-white"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRejectStatus;
