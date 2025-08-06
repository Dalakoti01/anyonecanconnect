"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { CircleDollarSign, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const JoinMentorship = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    currentProfession: "",
    experience: "",
    areaOfExpertise: [],
    professionalBio: "",
    linkedin: "",
    availability: "",
    mentoringType: [],
    reason: "",
    freeSession: "",
  });

  const ExpertiseCheckbox = ({ label, value }) => {
    const isChecked = input.areaOfExpertise.includes(value);

    const handleChange = (checked) => {
      if (checked) {
        setInput((prev) => ({
          ...prev,
          areaOfExpertise: [...prev.areaOfExpertise, value],
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          areaOfExpertise: prev.areaOfExpertise.filter(
            (item) => item !== value
          ),
        }));
      }
    };

    return (
      <div className="flex gap-2">
        <Checkbox
          id={value}
          checked={isChecked}
          onCheckedChange={handleChange}
        />
        <label
          htmlFor={value}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    );
  };

  const MentoringCheckbox = ({ label, value }) => {
    const isChecked = input.mentoringType.includes(value);
    const handleChange = (checked) => {
      if (checked) {
        setInput((prev) => ({
          ...prev,
          mentoringType: [...prev.mentoringType, value],
        }));
      } else {
        setInput((prev) => ({
          ...prev,
          mentoringType: prev.mentoringType.filter((item) => item !== value),
        }));
      }
    };

    return (
      <div className="flex gap-2">
        <Checkbox
          id={value}
          checked={isChecked}
          onCheckedChange={handleChange}
        />
        <label
          htmlFor={value}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    );
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const body = {
        fullName: input.fullName,
        email: input.email,
        currentProfession: input.currentProfession,
        experience: input.experience,
        areaOfExpertise: input.areaOfExpertise,
        professionalBio: input.professionalBio,
        linkedin: input.linkedin,
        availability: input.availability,
        mentoringType: input.mentoringType,
        reason: input.reason,
        freeSession: input.freeSession,
      };
      console.log("Data that is sent ", body);

      const res = await axios.post(`/api/user/applyAsMentor`, body, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/freelancer/mentorship");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center bg-[#fcfcfc]">
        <div className="w-full h-full">
          <div className="max-w-8xl pt-10 flex justify-center px-4">
            <h1 className="font-bold text-2xl text-center">
              Apply To Join As A Mentor
            </h1>
          </div>

          <div className="max-w-8xl pt-5 flex justify-center px-4">
            <h1 className="text-slate-800 text-lg text-center">
              Fill Out The Form And Start Your Mentor Application
            </h1>
          </div>

          <div className="max-w-8xl p-5 sm:p-10 mt-5 mb-10 mx-4 sm:mx-10 bg-white rounded-lg shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <p>Full Name</p>
                <Input
                  value={input.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Email Address</p>
                <Input
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p>Current Profession</p>
                <Input
                  value={input.currentProfession}
                  onChange={(e) =>
                    setInput({ ...input, currentProfession: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Years Of Experience</p>
                <Select
                  value={input.experience}
                  onValueChange={(value) =>
                    setInput({ ...input, experience: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1to3">1 - 3 years</SelectItem>
                    <SelectItem value="4to6">4 - 6 years</SelectItem>
                    <SelectItem value="7to10">7 - 10 years</SelectItem>
                    <SelectItem value="10">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <p>Area Of Expertise (Select All That Applies)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ExpertiseCheckbox
                  label="Software Development"
                  value="Software Development"
                />
                <ExpertiseCheckbox label="UX/UI Design" value="UX/UI Design" />
                <ExpertiseCheckbox
                  label="Product Management"
                  value="Product Management"
                />
                <ExpertiseCheckbox label="Data Science" value="Data Science" />
                <ExpertiseCheckbox label="Marketing" value="Marketing" />
                <ExpertiseCheckbox
                  label="Business Strategy"
                  value="Business Strategy"
                />
                <ExpertiseCheckbox label="Leadership" value="Leadership" />
                <ExpertiseCheckbox
                  label="Career Development"
                  value="Career Development"
                />
                <ExpertiseCheckbox
                  label="Entrepreneurship"
                  value="Entrepreneurship"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 gap-2">
              <p>Professional Bio</p>
              <Textarea
                name="professionalBio"
                placeholder="Enter your professional bio"
                value={input.professionalBio}
                onChange={(e) =>
                  setInput({ ...input, professionalBio: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col mt-3 gap-2">
              <p>Linkedin Profile Url</p>
              <Input
                value={input.linkedin}
                onChange={(e) =>
                  setInput({ ...input, linkedin: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col mt-3 gap-2">
              <p>Hours Availabilty Per Week</p>
              <Select
                value={input.availability}
                onValueChange={(value) =>
                  setInput({ ...input, availability: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1to2">1 - 2 hours</SelectItem>
                  <SelectItem value="3to5">3 - 5 hours</SelectItem>
                  <SelectItem value="6to10">6 - 10 hours</SelectItem>
                  <SelectItem value="10plus">10+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4 mt-5">
              <p>What Type Of Mentoring are you interested In ?</p>
              <div className="flex flex-wrap gap-3">
                <MentoringCheckbox
                  label="One-On-One-Session"
                  value="One-On-One-Session"
                />
                <MentoringCheckbox
                  label="Group Sessions"
                  value="Group Sessions"
                />
                <MentoringCheckbox
                  label="Project Based Mentoring"
                  value="Project Based Mentoring"
                />
                <MentoringCheckbox
                  label="Career Guidance"
                  value="Career Guidance"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4 gap-2">
              <p>Why Do You Want To Become A Mentor</p>
              <Textarea
                value={input.reason}
                onChange={(e) => setInput({ ...input, reason: e.target.value })}
              />
            </div>

            <div className="flex mt-4 flex-col gap-2">
              <p>Are you willing to offer a free introductory session?*</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setInput({ ...input, freeSession: true })}
                  variant={input.freeSession === true ? "default" : "outline"}
                >
                  Yes (15-30 minutes)
                </Button>
                <Button
                  onClick={() => setInput({ ...input, freeSession: false })}
                  variant={input.freeSession === false ? "default" : "outline"}
                >
                  No (Only Paid)
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              {loading ? (
                <Button className="mt-10 bg-blue-700 text-white hover:bg-blue-800 hover:text-white w-full sm:w-2/3">
                  Submitting ...{" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button
                  onClick={submitHandler}
                  className="mt-10 bg-blue-700 text-white hover:bg-blue-800 hover:text-white w-full sm:w-2/3"
                  variant="outline"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 mx-4 sm:mx-14 mb-10 max-w-8xl">
            <h1 className="font-bold text-2xl">
              Why Become a Mentor on Direct Connect?
            </h1>
            <div className="flex flex-col lg:flex-row gap-5">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="bg-white shadow-xl p-3 flex flex-col gap-3 rounded-lg"
                >
                  <div className="bg-blue-100 w-10 rounded-full p-2">
                    <CircleDollarSign />
                  </div>
                  <h1 className="font-bold">Additional Income</h1>
                  <p>
                    Earn while sharing your knowledge. Set your own rates and
                    receive 80% of all mentorship fees, with no hidden costs.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinMentorship;
