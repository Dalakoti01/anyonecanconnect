"use client"

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Check, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RatingStars from "../shared/RatingStars";
import { Badge } from "../ui/badge";
import useGetAllSuggestedTalent from "@/hooks/useGetAllSuggestedTalent";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams,useRouter } from "next/navigation";
import { setSelectedUser, setUserContacts } from "@/redux/authSlice";

const FindTalent = () => {
  const searchParams =  useSearchParams()
  const searchFromQuery = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(searchFromQuery || "");
  const { userContacts } = useSelector((store) => store.auth);
  const arr = [1, 2, 3, 4, 5, 6];
  const badge = [1, 2, 3, 4, 5];
  useGetAllSuggestedTalent();
  const { suggestedFreelancers } = useSelector((store) => store.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { label: "Top Freelancers", value: "" },
    { label: "Web Developer", value: "web developer" },
    { label: "App Developer", value: "app developer" },
    { label: "Design & Creativity", value: "design & creativity" },
    { label: "Creativity & Writing", value: "creativity & writing" },
  ];

  const filteredFreelancers = suggestedFreelancers?.filter((freelancer) => {
    const title = freelancer?.profile?.professionalTitle || "";
    const skills = freelancer?.skillProfile?.subCategory || [];

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="w-full pt-3">

      {/* Main Container */}
      <div className="min-h-screen  w-full h-full bg-[#fcfcfc] p-4 pb-[100px]">
        {/* Hero Section */}
        <div className="flex justify-center">
          <div className="mt-10 bg-[#21b3f3] h-auto text-white flex flex-col lg:flex-row items-center justify-between p-7 rounded-lg max-w-5xl w-full">
            <div className="flex flex-col font-bold w-full lg:w-1/2 gap-4">
              <h1 className="text-3xl md:text-4xl text-center lg:text-left">
                Find Free Top Talent
              </h1>
              <p className="text-md text-center lg:text-left">
                Connect directly with skilled professionals without commission
                fees. Our platform helps you find the perfect match for your
                project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="What Skills Are You Looking For?"
                  className="py-3 rounded-3xl bg-[#ffffff] text-black w-full sm:w-3/4"
                />
                <Button className="bg-blue-700 rounded-3xl">Search</Button>
              </div>
            </div>

            <img
              className="w-full max-w-xs md:max-w-sm mt-4 lg:mt-0 rounded-lg"
              src="/images/a-professional-stock-photo-showing-a-sma_djxgCCNlTqeQEf7nnSiKCg_YRygzkL9T5Sp7OoDjTtO-A.jpeg.jpg"
              alt=""
            />
          </div>
        </div>

        {/* Carousel Section */}
       <div className="w-full flex justify-center mt-7">
  <Carousel className="w-full bg-white max-w-5xl shadow-xl p-4 rounded-lg">
    <CarouselContent className="flex gap-3 sm:gap-4">
      {categories.map((category, index) => (
        <CarouselItem
          key={index}
          className="
            flex justify-center
            basis-1/2        /* mobile: 2 per row */
            sm:basis-1/3     /* small tablets: 3 per row */
            md:basis-1/4     /* tablets: 4 per row */
            lg:basis-1/5     /* laptops/desktops: 5 per row */
          "
        >
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm(category.value);
              setSelectedCategory(category.value);
            }}
            className={`rounded-xl w-full text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3
              ${
                selectedCategory === category.value
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
          >
            {category.label}
          </Button>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="hidden sm:flex" />
    <CarouselNext className="hidden sm:flex" />
  </Carousel>
</div>


        {/* Filters Section */}
        <div className="w-full flex justify-center">
          <div className="max-w-5xl w-full mt-7 flex flex-wrap justify-between gap-3">
            {/* Left Filters */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Button key={index} variant="outline">
                  Ranking <ChevronDown className="relative" />
                </Button>
              ))}
            </div>

            {/* Right Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <p className="mt-1">Sort By :</p>
              <Button variant="outline">
                Ranking <ChevronDown className="relative" />
              </Button>
            </div>
          </div>
        </div>

        {/* Freelancer Cards */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 max-w-5xl w-full">
            {filteredFreelancers.map((freelancer) => {
              let freelancerRating;
              freelancer?.yourRating?.map((rating) => {
                freelancerRating += rating.rating;
              })
              return(<div className="bg-white rounded-lg flex flex-col gap-3 p-4 shadow-md">
                {/* Profile Info */}
                <div className="flex gap-3 border-b-2 border-gray-200 pb-3">
                  <Avatar>
                    <AvatarImage
                      src={freelancer?.profile?.profilePhoto}
                      alt="image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1>{freelancer?.fullName}</h1>
                    <p className="text-slate-600">
                      {freelancer?.profile?.professionalTitle}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-2 mt-2">
                  <RatingStars className="mt-1" rating={freelancerRating} />
                  <p className="text-slate-600">(Manually Given For Now)</p>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {freelancer?.skillProfile?.subCategory.map((skill) => (
                    <Badge className="bg-slate-100 text-black text-xs px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div  className="flex flex-col gap-1 text-center">
                      <h1 className="text-lg font-bold">{freelancer?.projectCompleted}</h1>
                      <p className="text-sm">Completed Jobs</p>
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                      <h1 className="text-lg font-bold">{freelancer?.activeJobs?.length}</h1>
                      <p className="text-sm">Active Jobs</p>
                    </div>
                    <div  className="flex flex-col gap-1 text-center">
                      <h1 className="text-lg font-bold">1 </h1>
                      <p className="text-sm">Years Of Experience</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full mt-3 flex justify-between p-3 bg-slate-200 rounded-md">
                  
                 
                  <Button
                    className="bg-blue-700  text-white hover:bg-blue-800 hover:text-white"
                    onClick={() => {
                      console.log("Selected freelancer:", freelancer);
                      dispatch(setSelectedUser(freelancer));

                      dispatch(setUserContacts([...userContacts, freelancer]));
                      router.push("/message");
                    }}
                  >
                    Connect
                  </Button>
                  {freelancer?.mentor && <Badge className="bg-pink-200 text-brown-600 text-xs px-2 py-1 flex items-center">
                    <Check className="mr-1 h-3 w-3" /> Mentor
                  </Badge> }
                </div>
              </div>)
})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTalent;
