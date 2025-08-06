"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { setUser } from "@/redux/authSlice";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import axios from "axios";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("username", input.username);
    formData.append("role", input.role);

    try {
      setLoading(true)
      const res = await axios.post(`/api/user/signup`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("api call made");
      

      if (res.data.success) {
        console.log("api call is a success");
        
        toast.success(
          "Account created successfully! Please verify your email."
        );
        router.push(`/verify-user?email=${encodeURIComponent(input.email)}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-full py-5 bg-slate-300">
      <div className="flex px-12 shadow-xl rounded-xl py-12 flex-col gap-14 max-w-5xl w-[350px] border-2 bg-white">
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-xl mb-5 text-black">Account SignUp</h1>
          <div className="flex flex-col text-black gap-5">
            <div className=' flex flex-col gap-2'>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>
            <div className=' flex flex-col gap-2'>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>
            <div className=' flex flex-col gap-2'>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter Your Username"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
              />
            </div>
            <div className=' flex flex-col gap-2'>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter Your Full Name"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
              />
            </div>
            <div className=' flex flex-col gap-2'>
              <Label>Role</Label>
              <Select
                name="role"
                onValueChange={(value) => setInput({ ...input, role: value })}
                value={input.role}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-12">
              <div className="flex flex-col">
                <Link href="/login" className="text-sm cursor-pointer">
                  Already have an
                </Link>
                <Link href="/login" className="text-sm cursor-pointer">
                  Account? Log In
                </Link> 
              </div>
              <p className="text-sm cursor-pointer">Forget Password?</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <Button
              className="bg-white text-black shadow-md hover:bg-blue-500 hover:text-white text-xl py-5"
              type="submit"
              variant="outline"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

             <Button
              onClick={() => signIn("google",{callbackUrl:"/processing"})}
              className="bg-white text-black cursor-pointer border py-5 text-xl flex items-center justify-center gap-3 hover:bg-gray-100"
              type="button"
            >
              <FcGoogle size={24} />
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
