'use client';

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkAuthType = async () => {
      try {
        const res = await axios.get("/api/auth-type", { withCredentials: true });
        if (res.data.success) {
          setAuthType(res.data.authType);
        } else {
          console.warn("Auth type not found");
        }
      } catch (error) {
        console.error("Error checking auth type:", error);
      }
    };

    checkAuthType();
  }, []);

  const handleLogout = async () => {
    if (!authType) {
      toast.error("Authentication type not determined. Please wait...");
      return;
    }

    setLoading(true);

    try {
      if (authType === "google") {
        console.log("Logging out with Google auth");
        await signOut({ redirect: false });
        dispatch(setUser(null));
        router.push("/");
      } else if (authType === "custom") {
        console.log("Logging out with custom auth");

        const res = await axios.post("/api/user/logout", {}, { withCredentials: true });

        if (res.data.success) {
          dispatch(setUser(null));
          toast.success(res.data.message);
          router.push("/");
        } else {
          toast.error("Logout failed");
        }
      } else {
        toast.error("Unknown authentication type.");
      }
    } catch (error) {
      console.log("Logout error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      disabled={loading || !authType}
    >
      {loading ? (
        <>
          Logging out...
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
