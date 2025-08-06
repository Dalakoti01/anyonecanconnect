"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "@/redux/socketSlice";
import {
  increamentUnreadMessage,
  setOnlineUsers,
} from "@/redux/chatSlice";
import {
  addNotifications,
  increamentUnreadNotificationCount,
  setJobNotifications,
  setMessageNotifications,
} from "@/redux/rtnSlice";

const SocketProvider = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const socketInitialized = useRef(false);

  useEffect(() => {
    if (user && !socket && !socketInitialized.current) {
      const socketio = io("http://localhost:3001", {
        query: { userId: user._id },
      });

      dispatch(setSocket(socketio));
      socketInitialized.current = true;

      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(increamentUnreadNotificationCount(notification.userId));
        dispatch(addNotifications(notification));

        if (notification.type === "message") {
          dispatch(setMessageNotifications(notification));
          dispatch(increamentUnreadMessage(notification.userId));
        } else if (notification.type === "job") {
          dispatch(setJobNotifications(notification));
        } else if (notification.type === "Proposals") {
          dispatch(addNotifications(notification));
        }
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
        socketInitialized.current = false;
      };
    }
  }, [user, dispatch]);

  return null;
};

export default SocketProvider;
