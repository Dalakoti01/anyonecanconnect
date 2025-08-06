"use client";

import { setUser } from "@/redux/authSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SessionRedirectWrapper({ children }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !user) {
      dispatch(setUser(session.user));
    }
  }, [status, session, user]);

  return children;
}
