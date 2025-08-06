"use client";

import { setUser } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";

const UpdateProfileBio = ({ openBio, setOpenBio }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setInput({ bio: user.bio || "" });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to content
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", input.bio);

    try {
      setLoading(true);
      const res = await axios.post(`/api/user/updateProfile`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpenBio(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={openBio} onOpenChange={setOpenBio}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpenBio(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
            <DialogDescription>Edit Your Bio Here</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Bio" className="text-right">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={(e) => {
                    changeEventHandler(e);
                    handleTextareaResize(e);
                  }}
                  rows="1" // Initial row count
                  style={{ resize: "none", overflow: "hidden" }} // Disable manual resizing
                  className=" min-h-20 col-span-3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button disabled className="w-full">
                  Saving... <Loader2 className="animate-spin mr-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" type="submit">
                  Save changes
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileBio;
