"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  GraduationCap,
  Handshake,
  IndianRupee,
  Package2,
  SeparatorVertical,
  Star,
  UserPen,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllUnreadNotifications from "@/hooks/useGetAllUnreadNotifications";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import useGetAllFreelancersApplication from "@/hooks/useGetAllFreelancersApplication";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setSelectedJob } from "@/redux/jobSlice";

const FindJobs = () => {
  useGetAllUnreadNotifications();
  useGetAllJobs();
  useGetAllFreelancersApplication();

  const { user } = useSelector((state) => state.auth);
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("any");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("any");
  const [selectedDuration, setSelectedDuration] = useState("any");
  const [filteredJobs, setFilteredJobs] = useState(allJobs || []);
  const [openPopOver, setOpenPopOver] = useState(false);

  const [selectedJobId, setSelectedJobId] = useState("");

  const searchParams = useSearchParams();
  const searchFromQuery = searchParams.get("search") || "";

  const router = useRouter();

  let myRating = 0;
  user?.yourRating?.forEach((r) => (myRating += r.rating));

  const getDaysAgo = (dateString) => {
    if (!dateString) return "Some Time";
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffTime = now - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago `;
  };

  const applyHandleFilter = () => {
    const filtered = allJobs?.filter((job) => {
      const matchedCategory =
        selectedCategory === "any" ? true : job?.category === selectedCategory;

      const matchedKeyword = selectedKeyword
        ? job?.skills?.some((skill) =>
            skill.toLowerCase().includes(selectedKeyword.toLowerCase())
          )
        : true;

      const matchedBudget =
        selectedBudget === "any"
          ? true
          : (() => {
              const salary = job?.salary || 0;
              if (selectedBudget === "under100") return salary < 100;
              if (selectedBudget === "100to500")
                return salary >= 100 && salary <= 500;
              if (selectedBudget === "500to1000")
                return salary > 500 && salary <= 1000;
              if (selectedBudget === "1000to2000")
                return salary > 1000 && salary <= 2000;
              if (selectedBudget === "over2000") return salary > 2000;
              return true;
            })();

      const matchedDuration =
        selectedDuration === "any"
          ? true
          : job?.duration === selectedDuration;

      return (
        matchedCategory && matchedKeyword && matchedBudget && matchedDuration
      );
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    if (searchFromQuery) {
      const term = searchFromQuery.toLowerCase();
      const filtered = allJobs?.filter((job) => {
        const cat = job?.category?.toLowerCase() || "";
        const skills = job?.skills?.map((s) => s.toLowerCase()) || [];
        const title = job?.title?.toLowerCase() || "";

        return (
          cat.includes(term) ||
          skills.some((skill) => skill.includes(term)) ||
          title.includes(term)
        );
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [searchFromQuery, allJobs]);

  useEffect(() => {
    applyHandleFilter();
  }, [allJobs]);

  return (
    <div className="w-full min-h-screen pt-5 pb-5 bg-[#fcfcfc]">
      <div className="flex justify-center">
        <div className="w-full mt-5 max-w-6xl">
          <h1 className="text-3xl font-bold">Find Jobs</h1>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center">
        <div className="w-full mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white max-w-6xl rounded-lg shadow-2xl p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-500">Category</p>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {["any", "Web Developement", "Mobile Development", "Design & Creative", "Writing & Translation", "Marketing", "Other"].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-500">Keywords</p>
            <Input
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
              className="w-[180px]"
              placeholder="Search Keywords"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-500">Budget Range</p>
            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Budget" />
              </SelectTrigger>
              <SelectContent>
                {[
                  ["any", "All Budget"],
                  ["under100", "Under $100"],
                  ["100to500", "$100 - $500"],
                  ["500to1000", "$500 - $1000"],
                  ["1000to2000", "$1000 - $2000"],
                  ["over2000", "Over $2000"],
                ].map(([val, label]) => (
                  <SelectItem key={val} value={val}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-500">Project Duration</p>
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Any Duration" />
              </SelectTrigger>
              <SelectContent>
                {["any", "1-2 weeks", "2-4 weeks", "3 - 4 month", "1-3 month", "3-6 month"].map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center">
            <Button
              onClick={applyHandleFilter}
              variant="outline"
              className="bg-blue-700 text-white hover:bg-blue-800 font-bold"
            >
              <SeparatorVertical /> Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* JOB LISTING */}
      <div className="flex justify-center px-2 sm:px-4 mt-5">
        <div className="w-full max-w-6xl">
          {filteredJobs?.map((job) => (
            <div
              key={job?._id}
              className="bg-white hover:-translate-y-2 transition-transform duration-300 p-5 mt-4 shadow-2xl rounded-lg border-l-4 hover:border-blue-700 cursor-pointer flex flex-col gap-3"
            >
              <h1 className="font-bold text-xl">{job?.title}</h1>
              <div className="flex justify-between">
                <p className="text-slate-500 text-sm">{job?.owner?.fullName}</p>
                <div className="flex gap-1 items-center text-blue-600">
                  <IndianRupee />
                  <span className="text-lg">{job?.salary}</span>
                </div>
              </div>
              <p className="text-slate-600 text-sm">{job?.description}</p>
              <div className="flex gap-4 text-sm text-slate-700 flex-wrap">
                <span className="flex gap-1 items-center">
                  <Clock size={15} /> {job?.applicationDeadline.split("T")[0]}
                </span>
                <span className="flex gap-1 items-center">
                  <Star size={15} /> Rating Required 4+
                </span>
                <span className="flex gap-1 items-center">
                  <Package2 size={15} /> {job?.rank}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {job?.skills?.map((skill, idx) => (
                  <Badge key={idx} className="bg-blue-100 text-blue-600" variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between flex-wrap gap-3">
                <div className="flex gap-3">
                  <Button
  disabled={job?.application?.some(
    (app) => app?.applicant?.user === user?._id
  )}
  onClick={() => {
    setOpenPopOver(true);
    dispatch(setSelectedJob(job));
    router.push(`/freelancer/submitApplication/${job?._id}`);
  }}
  variant="outline"
  className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-bold"
>
  Submit Proposal
</Button>
                  <Button variant="outline">Save</Button>
                </div>
                <p className="text-slate-500 text-sm">
                  Posted {getDaysAgo(job?.createdAt)}
                </p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
