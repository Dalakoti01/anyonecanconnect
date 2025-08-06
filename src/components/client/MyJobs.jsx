  "use client"
  
  import React, { useEffect, useState } from "react";
  import { Button } from "../ui/button";
  import {
    ArrowDownUp,
    Grid2x2,
    IndianRupee,
    ListFilter,
    Search,
    TableOfContents,
  } from "lucide-react";
  import { Input } from "../ui/input";
  import { Badge } from "../ui/badge";
  import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import { useDispatch, useSelector } from "react-redux";
  import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import { useSearchParams,useRouter } from 'next/navigation';
  import { setSelectedJob } from "@/redux/jobSlice";
  import { setUserContacts } from "@/redux/authSlice";
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
  import { BsThreeDotsVertical } from "react-icons/bs";
import DialogTakeAction from "./Dialog/DialogTakeAction";
import DialogGiveReview from "./Dialog/DialogGiveReview";

  const MyJobs = () => {
    useGetAdminJobs();
   const searchParams = useSearchParams();
const statusFromQuery = searchParams.get("status") || "";
    const [selectedStatus, setSelectedStatus] = useState(statusFromQuery);
    useEffect(() => {
      setSelectedStatus(statusFromQuery);
    }, [statusFromQuery]);

    const { userContacts } = useSelector((store) => store.auth);
    const statusFilter = [
      { label: "All Jobs", value: "" },
      { label: "Paused", value: "paused" },
      { label: "Completed", value: "completed" },
      { label: "Progress", value: "progress" },
    ];
    const [searchItem, setSearchItem] = useState("");
    const { adminsJobs } = useSelector((store) => store.job);
    const [activeButton, setActiveButton] = useState(null);
    const [changeLayout, setChangeLayout] = useState("grid");
    const [takeAction, setTakeAction] = useState(false);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [jobId, setJobId] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const filteredJobs = adminsJobs?.filter((job) => {
      const title = job?.title?.toLowerCase() || "";
      const status = job?.status?.toLowerCase();

      const matchesTitleOrStatus =
        title.includes(searchItem?.toLowerCase()) ||
        status === searchItem?.toLowerCase();
      const matchesStatusFilter = selectedStatus
        ? status === selectedStatus.toLowerCase()
        : true;

      return matchesTitleOrStatus && matchesStatusFilter;
    });

    return (
      <div className="w-full min-h-screen">
        <div className="pb-5 w-full min-h-screen h-full bg-[#F5F5F5]">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-7xl flex flex-col md:flex-row mt-7 md:justify-between gap-4 ">
              <h1 className="text-2xl font-bold">My Jobs</h1>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="border-blue-600 text-xl font-bold text-blue-600 bg-[#F5F5F5] P-3"
                >
                  <ListFilter /> Filter
                </Button>

                <Button
                  variant="outline"
                  className="border-blue-600 text-xl font-bold text-blue-600 bg-[#F5F5F5] P-3"
                >
                  <ArrowDownUp /> Sort
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex  flex-col gap-4 mt-5 w-full max-w-7xl bg-white rounded-lg shadow-2xl ">
              <h1 className="text-xl px-4 pt-4">Filter Jobs</h1>
              <div className="flex flex-wrap pb-3 px-4 gap-2 w-full lg:w-1/2">
                {statusFilter?.map((status, index) => (
                  <Button
                    key={index}
                    className={`${
                      activeButton === index
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-black"
                    } hover:bg-blue-600 hover:text-white`}
                    onClick={() => {
                      setActiveButton(index);
                      setSearchItem(status.value);
                    }}
                    variant="outline"
                  >
                    {status?.label}
                  </Button>
                ))}
              </div>
              <div className="w-full border-t-2 pt-2 border-slate-300"></div>

              <div className="flex flex-col lg:flex-row justify-between gap-4 px-4 py-1 pb-4 w-full">
                <div className="flex  gap-4">
                  <div className="flex gap-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      id="fixed"
                    />
                    <label className="mt-2" htmlFor="fixed">
                      Fixed Price
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      id="hourly"
                    />
                    <label className="mt-2" htmlFor="fixed">
                      Hourly
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      id="milestones"
                    />
                    <label className="mt-2" htmlFor="fixed">
                      With Milestones
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 items-center w-full sm:w-auto">
                  <Search className="mt-1 text-gray-900" />
                  <Input
                    values={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    placeholder="Search Jobs ..."
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full mt-5 max-w-7xl flex gap-3 ml-5">
              {/* Grid View Icon */}
              <Grid2x2
                onClick={() => setChangeLayout("grid")}
                size={40}
                className={`cursor-pointer shadow-2xl rounded-md p-2 
          ${
            changeLayout === "grid"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
              />

              {/* Table View Icon */}
              <TableOfContents
                onClick={() => setChangeLayout("table")}
                size={40}
                className={`cursor-pointer shadow-2xl rounded-md p-2 
          ${
            changeLayout === "table"
              ? "bg-blue-600 text-white"
              : "bg-white text-black"
          }`}
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            {changeLayout === "grid" ? (
              <div className="max-w-7xl w-full bg-[#F5F5F5] grid grid-cols-1 md:grid-cols-3  xl:grid-cols-4 gap-5   rounded-lg p-2">
                {filteredJobs?.map((job) => {
                  const accepetedApplication = job?.application?.find(
                    (app) => app?.status === "accepted"
                  );

                  const applicant = accepetedApplication?.applicant;

                  return (
                    <div
                      key={job?._id}
                      className="flex transition-transform duration-300 hover:-translate-y-2 py-5 rounded-xl shadow-xl bg-white flex-col gap-5 p-3"
                    >
                      <div className=" flex justify-between">
                        <h1 className="font-bold">{job?.title}</h1>
                        <Badge
                          className={`rounded-lg h-[20px] ${
                            job?.status === "progress"
                              ? "text-green-600 bg-slate-200"
                              : job?.status === "paused"
                              ? "text-yellow-600 bg-orange-200"
                              : job?.status === "disputes"
                              ? "text-red-600 bg-red-200"
                              : job?.status === "completed"
                              ? "text-blue-600 bg-blue-200"
                              : ""
                          }`}
                          variant="outline"
                        >
                          {job?.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between  gap-2">
                        <div className="flex gap-2">
                          <Avatar className=" w-7 h-7">
                            <AvatarImage
                              src={job?.owner?.profile?.profilePhoto}
                              alt="image"
                            />
                            <AvatarFallback>
                              {job?.owner?.fullName
                                ? job?.owner?.fullName
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .toUpperCase()
                                : "CN"}
                            </AvatarFallback>
                          </Avatar>

                          <p className="text-slate-500">{job?.owner?.fullName}</p>
                        </div>

                        <Popover>
                          <PopoverTrigger asChild>
                            <button type="button" className="cursor-pointer">
                              <BsThreeDotsVertical className="mb-3" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[150px] text-sm">
                            <p
                              onClick={() => {
                                router.push("/selectDisputeType");
                                dispatch(setSelectedJob(job));
                              }}
                              className="cursor-pointer text-red-600 font-bold"
                            >
                              {" "}
                              Raise Dispute
                            </p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className=" flex justify-between">
                        <p className="text-sm text-slate-500">Contract Type</p>
                        <h1>{job?.budgetType} </h1>
                      </div>

                      <div className=" flex justify-between">
                        <p className="text-sm text-slate-500 ">Budget</p>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          <h1> {job?.salary} </h1>
                        </div>
                      </div>

                      <div className=" flex justify-between">
                        <p className="text-sm text-slate-500">Due Date</p>
                        <h1>
                          {job?.applicationDeadline
                            ? new Date(
                                job.applicationDeadline
                              ).toLocaleDateString()
                            : "No Deadline"}{" "}
                        </h1>
                      </div>

                      {job?.status === "active" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            onClick={() => {
                              dispatch(setSelectedJob(job));
                              router.push("/client/viewApplicants");
                            }}
                            variant="outline"
                            className="bg-blue-600 text-white"
                          >
                            View Applicants
                          </Button>
                          <Button
                            onClick={() => {
                              dispatch(setSelectedJob(job));
                              router.push(`/client/editJobs/${job?._id}`);
                            }}
                            variant="outline"
                          >
                            Edit Job
                          </Button>
                        </div>
                      ) : job?.status === "completed" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            onClick={() => {
                              router.push("/client/completedJob");
                              dispatch(setSelectedJob(job));
                            }}
                            variant="outline"
                          >
                            View Details
                          </Button>
                          {job?.reviewGiven?.byClient ? (
                            <Button
                              onClick={() => {
                                dispatch(
                                  setUserContacts(...userContacts, applicant)
                                );

                                router.push("/message");
                              }}
                              variant="outline"
                            >
                              Message
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => router.push(`/client/rateFreelancer/${job?._id}`)}
                            >
                              Rate Freelancer
                            </Button>
                          )}
                        </div>
                      ) : job?.status === "disputes" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            variant="outline"
                            className="bg-red-200 text-red-600"
                          >
                            Resolve Disputes
                          </Button>
                          <Button variant="outline">Message</Button>
                        </div>
                      ) : job?.status === "paused" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            onClick={() => {
                              // setTakeAction(true);
                              dispatch(setSelectedJob(job));
                              router.push(`/client/takeAction/${job?._id}`);
                              setJobId(job?._id);
                            }}
                            variant="outline"
                            className="bg-green-200 text-green-600"
                          >
                            Take Action
                          </Button>
                          <Button variant="outline">Message</Button>
                          <DialogTakeAction
                            setShowReviewDialog={setShowReviewDialog}
                            job={jobId}
                            open={takeAction}
                            setOpen={setTakeAction}
                          />
                        </div>
                      ) : job?.status === "progress" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            onClick={() => {
                              router.push("/client/completedJob");
                              dispatch(setSelectedJob(job));
                            }}
                            variant="outline"
                            className="bg-blue-600 text-white"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => {
                              const newContacts = Array.isArray(applicant)
                                ? [...userContacts, ...applicant] // flatten if it's already an array
                                : [...userContacts, applicant]; // just push as object if it's not

                              dispatch(setUserContacts(newContacts));
                              router.push("/message");
                            }}
                            variant="outline"
                          >
                            Message
                          </Button>
                        </div>
                      ) : job?.status === "review" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            onClick={() => {
                              router.push("/completedJobs");
                              dispatch(setSelectedJob(job));
                            }}
                            variant="outline"
                            className="bg-blue-600 text-white"
                          >
                            Review Changes
                          </Button>
                          <Button
                            onClick={() => {
                              const newContacts = Array.isArray(applicant)
                                ? [...userContacts, ...applicant] // flatten if it's already an array
                                : [...userContacts, applicant]; // just push as object if it's not

                              dispatch(setUserContacts(newContacts));
                              router.push("/message");
                            }}
                            variant="outline"
                          >
                            Message
                          </Button>
                        </div>
                      ) : job?.status === "specific" ? (
                        <div className="flex justify-center gap-10">
                          <Button
                            variant="outline"
                            className="bg-blue-700 text-white"
                          >
                            View Detail
                          </Button>
                          <Button variant="outline">Message</Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
                {showReviewDialog && (
                  <DialogGiveReview
                    open={showReviewDialog}
                    setOpen={setShowReviewDialog}
                  />
                )}
              </div>
            ) : (
              <div className="max-w-7xl w-full mx-auto bg-white shadow-lg rounded-lg p-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Job Title</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminsJobs.map((job) => (
                      <TableRow key={job?._id}>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>
                          <Avatar className="w-8 h-8 mr-2 pt-5  inline-block">
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          {job?.owner?.fullName}
                        </TableCell>
                        <TableCell>
                          <Badge className={` px-3 py-1 rounded-full`}>
                            {job?.status}
                          </Badge>
                        </TableCell>
                        <TableCell> ${job?.salary}</TableCell>
                        <TableCell>
                          <Button
                            className={`px-4 ${
                              job?.status === "active"
                                ? "bg-blue-500"
                                : "bg-red-600"
                            } text-white`}
                          >
                            Submit
                          </Button>
                          <Button variant="outline" className="ml-2">
                            Message
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default MyJobs;
