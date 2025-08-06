"use client"

import React, { useState } from "react";
import { Bell, Check, EllipsisVertical, Trash, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import useGetAllNotifications from "@/hooks/useGetAllNotifications";
import toast from "react-hot-toast";
import axios from "axios";
import {
  setAllNotifications,
  setAllUnreadNotification,
} from "@/redux/rtnSlice";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DialogDeleteAllNotification from "./Dialog/DialogDeleteAllNotification";
import DialogMarkAllNotifications from "./Dialog/DialogMarkAllNotifications";

const Notification = () => {
  const [refreshNotifications, setRefreshNotifications] = useState(false);
  const [hover, setHover] = useState(false);
  const { user } = useSelector((store) => store.auth);
  useGetAllNotifications(refreshNotifications);
  const { allNotifications } = useSelector(
    (store) => store.realTimeNotification
  );
  const { unreadNotifications } = useSelector(
    (store) => store.realTimeNotification
  );
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogMark, setOpenDialogMark] = useState(false);
  const status = [
    "All",
    "Unread",
    "Message",
    "Proposals",
    "Job",
    "Payments",
    "System",
  ];

  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredNotifications = allNotifications?.filter((notification) => {
    if (selectedStatus === "All") return true;
    if (selectedStatus === "Unread") return notification?.isRead === false;
    return notification?.category === selectedStatus;
  });

  const markOneNotification = async (notificationId) => {
    try {
      const res = await axios.get(
        `/api/notification/markSingleNotification/${notificationId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedNotifications = unreadNotifications?.filter(
          (noti) => noti?._id !== res.data.updatedNotification?._id
        );
        dispatch(setAllUnreadNotification(updatedNotifications));
        toast.success(res.data.message);
        setRefreshNotifications((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteOneNotification = async (notificationId) => {
    try {
      const res = await axios.delete(
        `/api/notification/deleteSingleNotification/${notificationId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const deletedNotification = res.data.deletedNotification?._id;
        const updatedNotifications = allNotifications.filter(
          (noti) => noti._id !== deletedNotification
        );
        dispatch(setAllNotifications(updatedNotifications));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-full pt-5">
      <div className="w-full min-h-screen pb-5 h-full bg-[#F5F5F5]">
        <div className="flex w-full justify-center pt-10 ">
          <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between p-3">
              <div className="flex gap-4">
                <Bell size={"30px"} className="text-blue-700 cursor-pointer" />
                <h1 className="font-bold text-2xl">Notifications</h1>
                <Badge variant="outline" className="bg-blue-700 text-white">
                  {allNotifications.filter((n) => !n.isRead).length} new
                </Badge>
              </div>

              <div className="flex gap-5">
                {!hover?<MdCheckCircleOutline
                size={"25px"}
                  onMouseEnter={() => setHover(true)}
                  onClick={() => setOpenDialogMark(true)}
                  className="cursor-pointer "
                /> : <MdCheckCircle onClick={() => setOpenDialogMark(true)}
                  className="cursor-pointer " size={"25px"} onMouseLeave={() => setHover(false)}/> }
                

                
                <MdDelete
                  size={"25px"}
                  onClick={() => setOpenDialogDelete(true)}
                  className=" font-bold cursor-pointer text-black hover:text-slate-600"
                />

                <DialogDeleteAllNotification
                  open={openDialogDelete}
                  setOpen={setOpenDialogDelete}
                />
                <DialogMarkAllNotifications
                  open={openDialogMark}
                  setOpen={setOpenDialogMark}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 px-4 py-3 pb-10 border-b-2 border-black">
              {status?.map((item, index) => (
                <div className="cursor-pointer" key={index}>
                  <Badge
                    onClick={() => setSelectedStatus(item)}
                    className={`${
                      selectedStatus === item
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100 text-black"
                    } text-sm sm:text-md md:text-base px-4 py-2 rounded-full transition-all`}
                    variant="outline"
                  >
                    {item}
                  </Badge>
                </div>
              ))}
            </div>

            {filteredNotifications.map((notification) => (
              <div
                key={notification?._id}
                className="  hover:bg-blue-100 flex justify-between p-3"
              >
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={notification?.sendersDetail?.profile?.profilePhoto}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1">
                    <h1>{notification?.message} </h1>
                    <p>
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <Check
                    onClick={() => markOneNotification(notification?._id)}
                    className="cursor-pointer text-blue-800"
                  />
                  <Trash2
                    onClick={() => deleteOneNotification(notification?._id)}
                    className="cursor-pointer text-blue-800"
                  />
                  <EllipsisVertical className="cursor-pointer text-blue-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
