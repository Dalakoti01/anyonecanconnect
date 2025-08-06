"use client"

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, CircleXIcon, Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UpdatePhotoDialog from "./Dialog/UpdatePhotoDialog";
import UpdateProfileDialog from "./Dialog/DialogProfileDialog";
import UpdateResumeDialog from "./Dialog/DialogResumeDialog";
import UpdateProfileBio from "./Dialog/UpdateProfileBio";
import UpdateGooglePassword from "./Dialog/UpdateGooglePassword";
import UpdateChangePassword from "./Dialog/UpdateChangePassword";
import DialogUpdateSkill from "./Dialog/DialogUpdateSkill";
import DialogUpdateUspSkill from "./Dialog/DialogUpdateUspSkill";

const EditProfile = () => {
  const router = useRouter();
  const [openSkill, setOpenSkills] = useState(false);
  const [uspSkill, setUspSkill] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBio, setOpenBio] = useState(false);
  const [googlePassword, setGooglePassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const calculateProgress = () => {
    let progress = 0;



    if (user?.profilePhoto) progress += 25;
    if (user?.resume) progress += 25;
    if (user?.bio) progress += 25;
    if (
      user?.fullName ||
      user?.email ||
      user?.languages?.length > 0 ||
      user?.professionalTitle
    ) {
      progress += 25;
    }

    return progress;
  };

  const progress = calculateProgress();

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  const renderIcon = (condition) => {
    return condition ? (
      <span className="text-green-500">✔</span>
    ) : (
      <span className="text-red-500">✖</span>
    );
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row gap-5 p-5 bg-slate-200">
     
      <div className="w-full lg:w-2/3 shadow-lg flex flex-col border-2 px-5 py-5 rounded-3xl bg-slate-50">
        <h1
          onClick={
            user?.role === "freelancer"
              ? () => router.push("/freelancer/freelancersHome")
              : () => router.push("/client/dashboard")
          }
          className="cursor-pointer"
        >
          <ArrowLeft />
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center p-5 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <Avatar className="w-24 h-24 md:w-38 md:h-38 rounded-full object-cover">
              <AvatarImage src={user?.profilePhoto} />
              <AvatarFallback>
                {user?.fullName
                  ? user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "KD"}
              </AvatarFallback>{" "}
            </Avatar>
            {/* <img
              className="w-24 h-24 md:w-38 md:h-38 rounded-full object-cover"
              src={user?.profilePhoto }
              alt=""
            /> */}
            <p className="text-sm text-gray-600">
              At least 800*800 px recommended
              <br />
              JPG or PNG is allowed
            </p>
          </div>
          <Button
            className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300"
            variant="outline"
            onClick={() => setOpenPhoto(true)}
          >
            <Edit2 /> Edit Profile
          </Button>
        </div>
        <UpdatePhotoDialog
          openPhoto={openPhoto}
          setOpenPhoto={setOpenPhoto}
        />

        <div className="mx-3 my-2 px-5 py-5 border-2 rounded-xl flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="font-bold text-xl">Personal Info</h1>
            <Button
              className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300"
              onClick={() => setOpenProfile(true)}
              variant="outline"
            >
              <Edit2 /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div>
              <h1 className="text-slate-400 text-sm">Full Name</h1>
              <h1>{user?.fullName || "Not specified"}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Email</h1>
              <h1>{user?.email || "Not specified"}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Languages</h1>
              <h1>{user?.languages?.join(", ") || "Not specified"}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Professional Title</h1>
              <h1>{user?.professionalTitle || "Not specified"}</h1>
            </div>
          </div>
          <UpdateProfileDialog
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
        </div>

        {user?.role === "freelancer" ? (
          <div className="mx-3 my-2 px-5 py-5 flex flex-col border-2 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="font-bold">Skills</h1>
              <Button
                className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300"
                onClick={() => setOpenSkills(true)}
                variant="outline"
              >
                <Edit2 /> Add Skills
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {user?.subCategory?.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <DialogUpdateSkill open={openSkill} setOpen={setOpenSkills} />
          </div>
        ) : (
          ""
        )}

        {user?.role === "freelancer" ? (
          <div className="mx-3 my-2 px-5 py-5 flex flex-col border-2 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="font-bold">Usp Skill</h1>
              <Button
                className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300"
                onClick={() => setUspSkill(true)}
                variant="outline"
              >
                <Edit2 /> Add Usp Skills
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {user?.uspSkill?.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <DialogUpdateUspSkill open={uspSkill} setOpen={setUspSkill} />
          </div>
        ) : (
          ""
        )}

        {user?.role === "freelancer" ? (
          <div className="mx-3 my-2 px-5 py-5 flex flex-col border-2 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="font-bold">Bio</h1>
              <Button
                className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300"
                onClick={() => setOpenBio(true)}
                variant="outline"
              >
                <Edit2 /> Edit
              </Button>
            </div>
            <div className="mt-3">
              <p>{user?.bio || "No bio added yet"}</p>
            </div>
            <UpdateProfileBio openBio={openBio} setOpenBio={setOpenBio} />
          </div>
        ) : (
          ""
        )}

        {user?.role === "freelancer" ? (
          <div className="border-2 rounded-xl my-2 py-5 mx-3">
            <div className="flex flex-col md:flex-row justify-between items-center p-5 gap-4">
              <a
                className="underline text-blue-500"
                href={user?.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                {user?.resumeOriginalName
                  ? user.resumeOriginalName.split(".").slice(0, -1).join(".")
                  : "Resume Not Uploaded"}
              </a>
              <Button
                className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300"
                variant="outline"
                onClick={() => setOpenResume(true)}
              >
                <Edit2 /> Upload Resume
              </Button>
            </div>
            <UpdateResumeDialog
              openResume={openResume}
              setOpenResume={setOpenResume}
            />
          </div>
        ) : (
          ""
        )}

        <div className="border-2 rounded-xl mx-3 my-2">
          <div className="p-5">
            <h1 className="font-bold text-lg mb-3">Password</h1>
            {user?.isGoogleUser ? (
              !user?.hasPassword ? (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    You are logged in with Google. Set a password for additional
                    login options:
                  </p>
                  <Button
                    className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300 ml-auto"
                    variant="outline"
                    onClick={() => setGooglePassword(true)}
                  >
                    Set Password
                  </Button>
                  <UpdateGooglePassword
                    googlePassword={googlePassword}
                    setGooglePassword={setGooglePassword}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    You can change your password here:
                  </p>
                  <Button
                    className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300 ml-auto"
                    variant="outline"
                    onClick={() => setResetPassword(true)}
                  >
                    Change Password
                  </Button>
                  <UpdateChangePassword
                    resetPassword={resetPassword}
                    setResetPassword={setResetPassword}
                  />
                </div>
              )
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  You can change your password here:
                </p>
                <Button
                  className="bg-slate-200 border border-gray-400 rounded-lg hover:bg-gray-300 ml-auto"
                  variant="outline"
                  onClick={() => setResetPassword(true)}
                >
                  Change Password
                </Button>
                <UpdateChangePassword
                  resetPassword={resetPassword}
                  setResetPassword={setResetPassword}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/5 h-[70vh] py-8 bg-slate-50 border-2 rounded-3xl shadow-lg px-8 flex flex-col items-center gap-6">
        <h2 className="font-bold text-lg text-center">Complete your profile</h2>
        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden flex items-center justify-center bg-white">
          <svg
            className="absolute inset-0 transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <circle
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              cx="18"
              cy="18"
              r="15.9155"
            />
            <circle
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeDasharray={`${(user?.profileCompletion / 100) * 100} 100`}
              strokeDashoffset="0"
              fill="none"
              cx="18"
              cy="18"
              r="15.9155"
              className="drop-shadow-md"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-bold text-xl text-gray-800">{user?.profileCompletion}%</span>
            <span className="text-sm text-gray-500">Complete</span>
          </div>
        </div>
        <ul className="text-sm md:text-lg w-full flex flex-col items-start gap-4">
          <li className="flex items-center gap-2">
            {renderIcon(user?.profilePhoto)}
            <span>Profile Photo</span>
          </li>
          <li className="flex items-center gap-2">
            {renderIcon(user?.resume)}
            <span>Resume</span>
          </li>
          <li className="flex items-center gap-2">
            {renderIcon(user?.bio)}
            <span>Perosnal Bio</span>
          </li>
          <li className="flex items-center gap-2">
            {renderIcon(
              user?.fullName ||
                user?.email ||
                user?.languages?.length > 0 ||
                user?.professionalTitle
            )}
            <span>Personal Info</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditProfile;
