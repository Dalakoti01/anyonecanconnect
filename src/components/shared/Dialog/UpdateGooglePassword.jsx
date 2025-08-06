"use client"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const UpdateGooglePassword = ({ googlePassword, setGooglePassword }) => {

  const { user } = useSelector((store) => store.auth);
    const { loading } = useSelector((store) => store.auth);
  
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", input.password);

    try {
      dispatch(setLoading(true));
      const res = await axios.put(`/api/user/set-password`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("everything is ok api success");

        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setGooglePassword(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Dialog open={googlePassword} onOpenChange={setGooglePassword}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setGooglePassword(false)}
        >
          <DialogHeader>
            <DialogTitle>Set Password</DialogTitle>
            <DialogDescription>Set Your Password Here</DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  Change Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={changeEventHandler}
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

export default UpdateGooglePassword;
