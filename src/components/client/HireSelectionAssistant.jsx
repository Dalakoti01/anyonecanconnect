"use client"

import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Check } from "lucide-react";
import RatingStars from "../shared/RatingStars";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import useGetAllHiringAssistant from "@/hooks/useGetAllHiringAssistant";

const HireSelectionAssistant = () => {
  useGetAllHiringAssistant()
  const {hiringAssistants} = useSelector(store => store.auth)

  const boys = [1, 2, 3, 4];
  const skills = [1, 2, 3, 4];
  const filteredHiringAssistant = hiringAssistants?.filter((hiringAssistant) => {
    const specialization = hiringAssistant?.yourSpecialization?.toLowerCase() || "";
    const rank = hiringAssistant
  })
  return (
    <div className="w-full pt-5 ">
      <div className="max-w-6xl w-full mt-10 mb-7 mx-auto">
        {" "}
        {/* Centering the content */}
        <h1 className="text-left text-blue-600  text-4xl font-bold">
          Talent Selection
        </h1>
      </div>
      <div className="w-full flex justify-center">
       <div className="w-full max-w-6xl p-5 sm:p-8 lg:p-10 bg-white shadow-2xl rounded-xl">
  {/* Header */}
  <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-3">
    <h1 className="text-lg sm:text-xl font-bold">Hire Selection Assistant</h1>
    <Button className="bg-blue-600 text-white w-full sm:w-auto" variant="outline">
      Get Started
    </Button>
  </div>

  {/* Content Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
    {/* Left Section */}
    <div className="flex flex-col gap-4 p-4 sm:p-5 bg-slate-100 rounded-xl">
      <h1 className="font-bold text-base sm:text-lg">What is a Selection Assistant?</h1>
      <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
        When you receive numerous applications for a job posting, our
        Selection Assistant can help you identify the best candidates.
        This tool allows you to hire a mid-level freelancer to review
        applications and recommend the most suitable talent for your
        project.
      </p>
    </div>

    {/* Right Section */}
    <div className="flex flex-col gap-4 p-4 sm:p-5 bg-slate-100 rounded-xl">
      <h1 className="font-bold text-base sm:text-lg">Benefits</h1>
      <div className="flex flex-col gap-1">
        <p className="text-sm sm:text-base text-slate-500">• Save time screening applications</p>
        <p className="text-sm sm:text-base text-slate-500">• Get expert recommendations</p>
        <p className="text-sm sm:text-base text-slate-500">• More accurate candidate matching</p>
        <p className="text-sm sm:text-base text-slate-500">• Reduce hiring mistakes</p>
        <p className="text-sm sm:text-base text-slate-500">• Transparent selection process</p>
      </div>
    </div>
  </div>
</div>

      </div>
      <div className="w-full  mt-7 flex justify-center">
<div className="w-full max-w-6xl  flex flex-col gap-10 bg-white p-4 shadow-2xl rounded-xl">
  <h1 className="font-bold text-xl text-start ml-0 md:ml-[60px] mb-4 md:mb-0">
    Find Selection Assistant
  </h1>
  <div className="flex flex-col md:flex-row md:justify-around gap-6 md:gap-0 w-full">
    <div className="flex flex-col gap-1 w-full md:w-auto">
      <Label htmlFor="specialization" className="mb-2 font-bold">
        Specialization
      </Label>
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="webDevelopment">Web Development</SelectItem>
          <SelectItem value="mobileDevelopment">Mobile Development</SelectItem>
          <SelectItem value="uiux">UI/UX Design</SelectItem>
          <SelectItem value="digitalMarketing">Digital Marketing</SelectItem>
          <SelectItem value="contentWriting">Content Writing</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="flex flex-col gap-1 w-full md:w-auto">
      <Label htmlFor="range" className="mb-2 font-bold">
        Budget Range
      </Label>
      <Input
        id="range"
        type="text"
        placeholder="Enter Your Budget in rupees ..."
        className="w-full md:w-[220px]"
      />
      <p className="text-xs text-slate-500">
        (10% upto 500 rupees will be the Hiring Assistant's Fees)
      </p>
    </div>

    <div className="flex flex-col gap-1 w-full md:w-auto">
      <Label htmlFor="range" className="mb-2 font-bold">
        Required Freelancers Rating
      </Label>
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Not Selected" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="any">Any Rating</SelectItem>
            <SelectItem value="sevenPlus">7+ Stars (Assistant : 3.0 - 6.9)</SelectItem>
            <SelectItem value="sixPlus">6+ Stars (Assistant : 3.0 - 5.9)</SelectItem>
            <SelectItem value="fivePlus">5+ Stars (Assistant : 3.0 - 4.9)</SelectItem>
            <SelectItem value="fourPlus">4+ Stars (Assistant : 3.0 - 3.9)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="w-full mb-5 flex flex-col items-center xs:flex-row justify-center gap-4">
    <Button variant="outline" className="shadow-xl w-1/2 xs:w-auto">
      Reset Filter
    </Button>
    <Button variant="outline" className="bg-blue-600 w-1/2 text-white  xs:w-auto">
      Apply Filter
    </Button>
  </div>
</div>
      </div>
      {hiringAssistants?.map((hiringAssistant) => (
        <div key={hiringAssistant?._id} className="w-full pb-5 mb-10 mt-10 flex justify-center ">
          <div className="w-full max-w-6xl shadow-2xl rounded-xl bg-white p-5 flex justify-between ">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={hiringAssistant?.userDetails?.profile?.profilePhoto} alt="image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                <h1>
                 {hiringAssistant?.userDetails?.fullName}
                </h1>
                <Check className="text-blue-700"  />
                </div>
               
                <p className="text-sm text-slate-500">
                  {hiringAssistant?.yourSpecialization}
                </p>
                <div className="flex gap-2">
                  <RatingStars rating={5} />
                  <p>(48 reviews )</p>
                </div>
                <div className="flex gap-2">
                {hiringAssistant?.skills.map((skill) => (
                  <div className="flex gap-2">
                    <Badge className="bg-slate-200" variant="outline">
                      {skill}
                    </Badge>
                  </div>
                ))}
                </div>
                
               <div className="grid grid-cols-3 gap-5">
  <div className="flex flex-col items-center">
    <h1 className="font-bold">$75</h1>
    <p className="text-sm text-slate-500 mt-2">Hiring Assistant's Rank</p>
  </div>
  <div className="flex flex-col items-center">
    <h1 className="font-bold">80%</h1>
    <p className="text-sm text-slate-500 mt-2">Job Success</p>
  </div>
  <div className="flex flex-col items-center">
    <h1 className="font-bold">5</h1>
    <p className="text-sm text-slate-500 mt-2">Years Exp.</p>
  </div>
</div>

              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <Button variant="outline" className="border-blue-700 border-s-2 text-blue-700">Shortlist</Button>
              <Button variant="outline" className="bg-blue-600 text-white">Connect</Button>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full mt-10">

      </div>

    </div>
  );
};

export default HireSelectionAssistant;
