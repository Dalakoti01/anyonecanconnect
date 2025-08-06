"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const UpdateResumeDialog = ({ openResume, setOpenResume }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log("User in UpdateResumeDialouge:", user); // Log updated user profile

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    file: "",
  });

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.file) {
      formData.append("resume", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/user/updateFiles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("API Response:", res.data); // Log the response to track success
      if (res.data.success) {
        // Log the URL of the uploaded profile photo
        console.log("Uploaded File URL:", res.data.user?.resume);

        dispatch(setUser(res.data.user)); // Update Redux state immediately
        console.log("Updated user state:", res.data.user);

        toast.success(res.data.message);
        setOpenResume(false); // Close dialog after successful update
      } else {
        console.error("Unexpected API Response:", res.data);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={openResume} onOpenChange={setOpenResume}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpenResume(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Resume</DialogTitle>
            <DialogDescription>
              Edit your Resume by clicking here{" "}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Resume
                </Label>
                <Input
                  id="name"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={changeFileHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button disabled className="bg-gray-500">
                  Saving... <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenResume(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateResumeDialog;
