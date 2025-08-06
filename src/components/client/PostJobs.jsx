"use client"

import React, { useEffect, useState } from "react";
import {
  Bot,
  Calendar,
  CircleAlert,
  CircleX,
  CircleXIcon,
  DollarSign,
  IndianRupee,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar as CalendarPicker } from "../ui/calendar";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaStar } from "react-icons/fa";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import DialogRevisionWarning from "./Dialog/DialogRevisionWarning";

const PostJobs = () => {
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    category: "",
    rank: "",
    description: "",
    skills: [],
    jobType: "",
    duration: "",
    budgetType: "",
    salary: "",
    applicationDeadline: "",
  });

  useEffect(() => {
  const savedDraft = localStorage.getItem(JOB_DRAFT_KEY);
  if (savedDraft) {
    setInput(JSON.parse(savedDraft));
  }
}, []);
  const [skill, setSkill] = useState("");

  const addSkillHandler = (e) => {
    e.preventDefault();
    if (skill.trim() !== "" && !input.skills.includes(skill)) {
      setInput((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
      setSkill(""); // Clear input field after adding
    }
  };

  const removeSkillHandler = (removedSkill) => {
    setInput((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== removedSkill),
    }));
  };
  const addEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      setInput((prev) => ({
        ...prev,
        applicationDeadline: format(date, "yyyy-MM-dd"),
      }));
    }
  };


  const [revisionWarning,setRevisionWarning] = useState(false)

  const JOB_DRAFT_KEY = "job_draft";
  const saveAsDraft = () => {
    try {
      localStorage.setItem(JOB_DRAFT_KEY,JSON.stringify(input));
      toast.success("Job Saved As Draft");

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  const submitHandler = async () => {
    console.log(input);

    try {
      if(!checkedTerms){
      toast.error("You must agree to the Terms of Service and Privacy Policy before posting a job.");
      return;
      }
      setLoading(true);
      const res = await axios.post(
        `/api/job/postJob`,
        input,
        { withCredentials: true }
      );

      if (res.data.success) {
          localStorage.removeItem(JOB_DRAFT_KEY);

        toast.success(res.data.message);
        router.push("/client/myJobs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="pt-3 w-full">
      <div className="w-full flex justify-center">
        <div className="bg-white mb-20 shadow-2xl max-w-5xl flex flex-col gap-4 rounded-lg p-4 mt-10 ">
          <h1 className="text-2xl font-bold ">Post A New Job </h1>

          <div className="w-full bg-orange-100 border-l-4 border-yellow-500 px-7 py-5 flex flex-col gap-2 ">
<div className="flex gap-3 text-yellow-700">
<CircleAlert />
<p className="font-bold">Important Notice : Revision Policy</p>

</div>
<p className="text-yellow-700">
Please be advised that you will only have 5 days after work submission to request any revisions. After this 5-day period, the work will be automatically considered complete and payment will be released to the freelancer. Please note that no compensation or refunds will be available after this period (0% of your payment will be returnable).
</p>
          </div>
          <div className="w-full bg-blue-100 border-l-4 border-blue-600  px-7 py-5 flex flex-col gap-2">
            <div className="flex text-blue-500 gap-3">
              <Lightbulb />
              <p className="text-sm">
                Not sure how to describe your job? Our AI assistant can help you
                create a detailed job description by asking you a few questions.
              </p>
            </div>

            <Button
              variant="outline"
              className="bg-blue-600 text-white mr-5 w-1/5"
            >
              <Bot /> Use AI Assistant{" "}
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <h1>Job Title</h1>
            <Input
              name="title"
              onChange={addEventHandler}
              value={input.title}
              placeholder="e.g Web Developer, Graphic Designer ,Content Writer  "
              className="w-full h-[40px] border-blue-500 border-s-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <h1>Job Category</h1>
              <Select
                name="category"
                value={input.category}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-[380px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a Category</SelectLabel>
                    <SelectItem value="Web Developement">
                      Web Developement
                    </SelectItem>
                    <SelectItem value="Mobile Development">
                      Mobile Development
                    </SelectItem>
                    <SelectItem value="Design & Creative">
                      Design & Creative
                    </SelectItem>
                    <SelectItem value="Writing & Translation">
                      Writing & Translation
                    </SelectItem>
                    <SelectItem value="Marketing">Marketing </SelectItem>
                    <SelectItem value="Other">Other </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <h1>Freelancer Level Required</h1>
              <Select
                name="rank"
                value={input.rank}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, rank: value }))
                }
              >
                <SelectTrigger className="w-[380px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a Required Level</SelectLabel>
                    <SelectItem className="cursor-pointer" value="Any Level">Any Level</SelectItem>
                    <SelectItem disabled value="Beginner">
                      <span>
                        Beginner (1 - 2
                        <FaStar className="inline mb-1 ml-1 text-yellow-400" />)
                      </span>
                    </SelectItem>
                    <SelectItem disabled value=" Intermediate">
                      <span>
                        Intermediate (3 - 4
                        <FaStar className="inline mb-1 ml-1 text-yellow-400" />)
                      </span>
                    </SelectItem>
                    <SelectItem disabled value="Experienced">
                      <span>
                        Experienced (3 - 4
                        <FaStar className="inline mb-1 ml-1 text-yellow-400" />)
                      </span>
                    </SelectItem>

                    <SelectItem disabled value="Expert">
                      <span>
                        Expert (8 - 10
                        <FaStar className="inline mb-1 ml-1 text-yellow-400" />)
                      </span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1>Job Description</h1>

            <Textarea
              name="description"
              onChange={addEventHandler}
              value={input.description}
              className="h-[150px] border-blue-500 border-s-2"
              placeholder="Describe your project , requirements and expectations in detail..."
            />
          </div>

          <div className="flex flex-col mt-4 gap-4">
            <h1>Key Skills Required</h1>
            <div className="flex flex-wrap gap-2">
              {input.skills.map((s, index) => (
                <Badge key={index} variant="outline" className="bg-slate-300">
                  {s}{" "}
                  <CircleXIcon
                    className="ml-3 cursor-pointer"
                    size={"18px"}
                    onClick={() => removeSkillHandler(s)}
                  />
                </Badge>
              ))}
            </div>

            <div className="w-full  gap-3">
              <form className=" flex gap-3 w-full" onSubmit={addSkillHandler}>
                <Input
                  name="skill"
                  onChange={(e) => setSkill(e.target.value)}
                  value={skill}
                  placeholder="Add a required skill ...."
                  className="w-[900px] border-blue-500"
                />
                <Button
                  type="submit"
                  onClick={addSkillHandler}
                  variant="outline"
                  className="bg-blue-600"
                >
                  Add
                </Button>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <h1>Job Type</h1>
              <Select
                name="jobType"
                value={input.jobType}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, jobType: value }))
                }
              >
                <SelectTrigger className="w-[380px]">
                  <SelectValue placeholder="One Time Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="oneTime">One Time Project</SelectItem>
                    <SelectItem disabled value="ongoing">Ongoing Project</SelectItem>
                    <SelectItem disabled value="contract">Contract</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <h1>Project Duration</h1>
              <Select
                name="duration"
                value={input.duration}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, duration: value }))
                }
              >
                <SelectTrigger className="w-[380px]">
                  <SelectValue placeholder="Less Than A week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Any Level">Less Than A week</SelectItem>
                    <SelectItem value="1-2 weeks">1 - 2 weeks</SelectItem>
                    <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-3 month">1 - 3 month</SelectItem>

                    <SelectItem value="3-6 month">3 - 6 month</SelectItem>

                    <SelectItem value="more than 6 month">
                      more than 6 month
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <h1>Budget Type</h1>
              <Select
                name="budgetType"
                value={input.budgetType}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, budgetType: value }))
                }
              >
                <SelectTrigger className="w-[380px]">
                  <SelectValue placeholder="Fixed Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem disabled value="hourly">Hourly Rate</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <h1>Budget Amount</h1>
              <div className="relative w-[380px]">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  name="salary"
                  value={input.salary}
                  onChange={addEventHandler}
                  className="w-full pl-8 border-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h1>Application Deadline</h1>
            <div className="w-full relative">
              <Input
                name="selectedDate"
                className="w-full border-blue-600 pl-4 pr-10 cursor-pointer"
                placeholder="dd-mm-yyyy"
                value={selectedDate ? format(selectedDate, "dd-MM-yyyy") : ""}
                readOnly
              />{" "}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Calendar className="text-gray-500 cursor-pointer" />
                  </button>
                </PopoverTrigger>

                {/* Calendar Popup */}
                <PopoverContent className="w-auto bg-white shadow-md rounded-md">
                  <CalendarPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* <div className="flex gap-2">
            <input type="checkbox" id="myCheckbox1" />
            <label htmlFor="myCheckbox1">
              I would like hiring assistance from a mid-level freelancer
            </label>
          </div> */}

         <div className="flex gap-2">
  <input
    onClick={() => {setRevisionWarning(true); console.log(revisionWarning);
     }}
    type="checkbox"
    id="myCheckbox"
    checked={checkedTerms}
    onChange={(e) => setCheckedTerms(e.target.checked)}

  />
  <label htmlFor="myCheckbox">
    I agree to Next Connect's{" "}
    <span
      onClick={(e) => {
        e.stopPropagation();
        router.push("/terms-condition");
      }}
      className="text-blue-600 cursor-pointer"
    >
      Terms of Service
    </span>{" "}
    and{" "}
    <span
      onClick={(e) => {
        e.stopPropagation();
        router.push("/privacy-policy");
      }}
      className="text-blue-600 cursor-pointer"
    >
      Privacy Policy
    </span>
  </label>
</div>
<DialogRevisionWarning open={revisionWarning} setOpen={setRevisionWarning} />

          <div className="flex gap-7 justify-end">
            <Button onClick={saveAsDraft} variant="outline" className="bg-slate-300 ">
              Save as Draft
            </Button>
            {loading ? (
              <Button className="bg-blue-800 text-white" variant="outline">
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please Wait
              </Button>
            ) : (
              <Button
                onClick={submitHandler}
                variant="outline"
                className="bg-blue-800 text-white"
              >
                Post Job
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
