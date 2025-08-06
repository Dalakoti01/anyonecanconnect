"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CalendarCheck, Building2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState("freelancer");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
const { update, data: session } = useSession();
  const submitHandler = async () => {
  const userId = user?._id || session?.user?._id;

  try {
    const res = await axios.post(
      `/api/user/updateRole`,
      { userId, role: selectedRole },
      { withCredentials: true }
    );

    if (res.data.success) {
      await update(); // refresh session from server
      const updatedSession = await update(); // make sure session is updated again
      const updatedUser = updatedSession?.user;

      if (updatedUser) {
        dispatch(setUser(updatedUser));
        toast.success(res.data.message);

        if (updatedUser.role === "freelancer") {
          router.push("/freelancer/freelancersHome");
        } else {
          router.push("/client/dashboard");
        }
      } else {
        toast.error("User session not updated. Try refreshing.");
      }
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};
  const handleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-100 p-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Join as a client or freelancer
        </h1>
        <p className="text-gray-500 mt-2">
          Choose your path and start your journey with us
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          {/* Freelancer Card */}
          <Card
            onClick={() => handleSelect("freelancer")}
            className={`flex-1 cursor-pointer transition-all duration-200 border-2 ${
              selectedRole === "freelancer"
                ? "border-blue-500 shadow-lg"
                : "border-gray-200"
            }`}
          >
            <CardContent className="p-6 text-left">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CalendarCheck className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">I want to work</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1 mb-3">as a freelancer</p>
              <ul className="space-y-2 mt-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={16} />
                  Browse jobs that match your skills
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={16} />
                  Build long-term client relationships
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={16} />
                  Get paid safely and securely
                </li>
              </ul>
              {selectedRole === "freelancer" && (
                <p className="text-blue-600 mt-4 text-sm font-medium">
                  Selected
                </p>
              )}
            </CardContent>
          </Card>

          {/* Client Card */}
          <Card
            onClick={() => handleSelect("client")}
            className={`flex-1 cursor-pointer transition-all duration-200 border-2 ${
              selectedRole === "client"
                ? "border-blue-500 shadow-lg"
                : "border-gray-200"
            }`}
          >
            <CardContent className="p-6 text-left">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building2 className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">I want to hire</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1 mb-3">for a project</p>
              <ul className="space-y-2 mt-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={16} />
                  Access to global talent pool
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={16} />
                  Safe and secure payments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-500" size={16} />
                  Project management tools
                </li>
              </ul>
              {selectedRole === "client" && (
                <p className="text-blue-600 mt-4 text-sm font-medium">
                  Selected
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Button
          className="mt-8 px-6 py-3 text-white text-sm"
          onClick={() => {
            console.log("Joining as", selectedRole);
            submitHandler();
          }}
        >
          {selectedRole === "freelancer"
            ? "Join as a Freelancer"
            : "Join as a Client"}
        </Button>
      </div>
    </div>
  );
}
