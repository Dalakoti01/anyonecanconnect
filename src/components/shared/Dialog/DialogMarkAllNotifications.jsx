import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { setAllUnreadNotification } from "@/redux/rtnSlice";
import useGetAllNotifications from "@/hooks/useGetAllNotifications";

const DialogMarkAllNotifications = ({ open, setOpen }) => {
  const [refreshJobs,setRefreshJobs]  = useState(false)
  useGetAllNotifications(refreshJobs)

  const dispatch = useDispatch();
  const markAllAsRead = async () => {
    try {
      const res = await axios.get(
        `/api/notification/markUsersAllNotifications`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAllUnreadNotification([]));
        setRefreshJobs(prev => !prev);
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
            This action cannot be undone. This will permanently mark all your
            notification as read
          </DialogDescription>
          <div className="flex justify-center gap-10 pt-7">
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="bg-blue-700 text-white w-[100px]"
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="bg-red-700 text-white w-[100px]"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMarkAllNotifications;
