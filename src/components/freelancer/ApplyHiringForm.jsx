"use client";

import React, { useState } from "react";
import { Briefcase, Loader2 } from "lucide-react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const ApplyHiringForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    yourSpecialization: "",
    yearsOfExperience: "",
    skills: [],
    reason: "",
  });

  const handleSkillsChange = (e) => {
    const rawValue = e.target.value;
    const skillsArray = rawValue
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0); // remove empty strings
    setInput((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      console.log(input);
      const body = {
        yourSpecialization: input.yourSpecialization,
        yearsOfExperience: input.yearsOfExperience,
        skills: input.skills,
        reason: input.reason,
      };
      const res = await axios.post(`/api/user/applyHiringAssistant`, body, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser({ ...user, hiringAssistantStatus: "Pending" }));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#fcfcfc]">
        <div className="w-full h-full flex justify-center">
          <div className="max-w-7xl w-full flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-3 mt-10">
              <h1 className="font-bold text-2xl text-center">
                Become a Hiring Assistant
              </h1>
              <p>
                Help Clients Find The Perfect Talent And Earn Additional Income
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-2xl p-4 ">
              <div className="flex gap-2 pb-5 border-b-2 border-slate-200">
                <div className="bg-blue-100 text-blue-600  w-[50px] h-[40px] flex justify-center items-center rounded-full">
                  <Briefcase />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-xl">
                    What is a Hiring Assistant ?{" "}
                  </h1>
                  <p>
                    A Hiring Assistant helps clients select the most suitable
                    freelancer for a job, especially when the client is not from
                    the technical field. You'll post jobs on behalf of clients,
                    shortlist candidates, and recommend the best talent.
                  </p>
                </div>
              </div>

              <h1 className="font-bold pt-4">
                Benefits of becoming a Hiring Assistant
              </h1>
              <div className="flex flex-col gap-1 pt-5 ">
                <div className="flex gap-1">
                  <IoMdCheckboxOutline
                    className="text-green-600"
                    size={"20px"}
                  />
                  <p>Additional income stream alongside your freelance work</p>
                </div>

                <div className="flex gap-1">
                  <IoMdCheckboxOutline
                    className="text-green-600"
                    size={"20px"}
                  />
                  <p>Expand your professional network</p>
                </div>

                <div className="flex gap-1">
                  <IoMdCheckboxOutline
                    className="text-green-600"
                    size={"20px"}
                  />
                  <p>Showcase your expertise in your field</p>
                </div>

                <div className="flex gap-1">
                  <IoMdCheckboxOutline
                    className="text-green-600"
                    size={"20px"}
                  />
                  <p>Help clients make better hiring decisions</p>
                </div>
              </div>
            </div>
            {user?.hiringAssistantStatus === "Pending" ? (
              <div className="bg-white mb-[240px] shadow-xl p-5  rounded-lg w-full flex flex-col gap-4 justify-center items-center">
                <div className="bg-green-100 p-3 text-green-600 rounded-full">
                  <IoMdCheckboxOutline
                    className="text-green-600"
                    size={"40px"}
                  />
                </div>

                <h1 className="font-bold text-xl">Application Submitted</h1>
                <p>
                  Your Application is being reviewed . You'll be notified once
                  it's approved{" "}
                </p>
              </div>
            ) : user?.hiringAssistantStatus === "Inactive" ? (
              <div className="bg-white mb-[240px] shadow-xl rounded-lg p-4 w-full flex flex-col gap-4">
                <h1 className="font-bold text-xl">Application Form</h1>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Your Specialization</p>
                  <Input
                    name="specialization"
                    value={input.yourSpecialization}
                    onChange={(e) =>
                      setInput({ ...input, yourSpecialization: e.target.value })
                    }
                    placeholder="e.g Web Development , Graphic Designer , Content Writing"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm">Years Of Experience</p>
                  <Input
                    name="experience"
                    value={input.yearsOfExperience}
                    onChange={(e) =>
                      setInput({ ...input, yearsOfExperience: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm">Key Skills (comma separated)</p>
                  <Input
                    onChange={handleSkillsChange}
                    placeholder="e.g. React, UI Design, Project Management"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    Why Do You Want To Become a Hiring Assitant?
                  </p>
                  <Textarea
                    name="reason"
                    value={input.reason}
                    onChange={(e) =>
                      setInput({ ...input, reason: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-1">
                  <input id="agree" type="checkbox" />
                  <label htmlFor="agree" className="text-sm">
                    I understand and agree to the Hiring Assistant Terms And
                    Conditions
                  </label>
                </div>
                {loading ? (
                  <Button className="bg-blue-700 py-7 text-white hover:bg-blue-800 hover:text-white font-bold text-xl">
                    Submitting ...{" "}
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={submitHandler}
                    className="bg-blue-700 py-7 text-white hover:bg-blue-800 hover:text-white font-bold text-xl"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyHiringForm;
