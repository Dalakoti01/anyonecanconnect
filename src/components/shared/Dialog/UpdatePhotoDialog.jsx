"use client"

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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const UpdatePhotoDialog = ({ openPhoto, setOpenPhoto }) => {
  const { loading } = useSelector((store) => store.auth);

  const { user } = useSelector((store) => store.auth);
  console.log("User in UpdatePhotoDialouge:", user); // Log updated user profile

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
      formData.append("profilePhoto", input.file);
      console.log("Sending Files:", input.file); // Log the file being sent
      
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `/api/user/updateFiles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("API Response:", res.data); // Log the response to track success
      if (res.data.success) {
        // Log the URL of the uploaded profile photo
        console.log("Uploaded File URL:", res.data.user?.profilePhoto);

        dispatch(setUser(res.data.user)); // Update Redux state immediately
        console.log("Updated user state:", res.data.user);

        toast.success(res.data.message);
        setOpenPhoto(false); // Close dialog after successful update
      } else {
        console.error("Unexpected API Response:", res.data);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Dialog open={openPhoto} onOpenChange={setOpenPhoto}>
        <DialogContent
          className="sm:max-w-[425px]"
          onClose={() => setOpenPhoto(false)}
          onInteractOutside={() => setOpenPhoto(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile Photo</DialogTitle>
            <DialogDescription>
              Edit your Profile by clicking here{" "}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Profile Photo
                </Label>
                <Input
                  id="name"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button type="submit">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </Button>
              ) : (
                <Button type="submit">Update</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdatePhotoDialog;
