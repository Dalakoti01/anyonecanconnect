'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Briefcase, Clock8, IndianRupee, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { setSelectedUser, setUserContacts } from "@/redux/authSlice";
import OpenProposal from "./Dialog/OpenProposal";
import DialogRejectStatus from "./Dialog/DialogRejectStatus";

const ViewApplicants = () => {
  const [rejectStatus, setRejectStatus] = useState(false);
  const [openProposal, setOpenProposal] = useState(false);
  const [application, setApplication] = useState("");

  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <div className="w-full pb-10 min-h-screen h-full bg-[#F5F5F5]">
        <div className="w-full pt-5 flex justify-center">
          <div className="max-w-7xl w-full flex justify-between">
            <h1 className="font-bold">Job Applicants</h1>
            <div className="flex gap-2 text-blue-600">
              <ArrowLeft className="cursor-pointer" onClick={() => router.push("/client/myJobs")} />
              <h1>Back To My Jobs</h1>
            </div>
          </div>
        </div>

        <div className="w-full mt-5 flex justify-center">
          <div className="w-full max-w-7xl rounded-lg bg-white shadow-xl p-5 flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-bold text-xl">{selectedJob?.title}</h1>
              <p className="text-sm">Budget</p>
            </div>

            <div className="flex justify-between">
              <Badge className="bg-blue-200 text-blue-600" variant="outline">
                {selectedJob?.status}
              </Badge>
              <h1 className="font-bold flex gap-1">
                <IndianRupee /> {selectedJob?.salary}
              </h1>
            </div>

            <div className="flex flex-col">
              <p className="text-sm">Due Date</p>
              <p className="font-bold">{selectedJob?.applicationDeadline?.split("T")[0]}</p>
            </div>

            <div className="flex flex-col">
              <h1 className="text-slate-500">Description</h1>
              <p className="text-sm text-slate700">{selectedJob?.description}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-5">
          <div className="max-w-7xl w-full">
            <h1 className="font-bold mb-5">
              Applicants ({selectedJob?.application?.length})
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="max-w-7xl w-full flex flex-col gap-5">
            {selectedJob?.application?.length === 0 ? (
              <h1 className="mt-5 text-center font-bold mb-[200px]">
                As of now there are no applicants
              </h1>
            ) : null}

            {selectedJob?.application?.map((app) => {
              const user = app?.applicant?.user;
              const profile = user?.profile;
              const ratings = user?.yourRating || [];
              const freelancerRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
              const averageRating = ratings.length ? freelancerRating / ratings.length : 0;

              return (
                <div
                  className="bg-white rounded-lg flex justify-between p-4 shadow-xl"
                  key={app?._id}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-5">
                      <Avatar className="w-[60px] h-[60px]">
                        <AvatarImage src={profile?.profilePhoto} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col gap-1">
                        <h1 className="font-bold">{user?.fullName}</h1>
                        <p className="text-slate-500 text-sm">{profile?.professionalTitle}</p>

                        <div className="flex gap-5 text-sm">
                          <div className="flex gap-1">
                            <Clock8 size={"18px"} />
                            Experience: {user?.experience || 0} years
                          </div>

                          <div className="flex gap-1">
                            <Star size={"18px"} />
                            {averageRating.toFixed(1)}
                          </div>

                          <div className="flex gap-1">
                            <Briefcase size="18px" />
                            Project Completed: {user?.projectCompleted}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setOpenProposal(true);
                          setApplication(app);
                        }}
                        className="bg-blue-700 text-white"
                        variant="outline"
                      >
                        View Proposal
                      </Button>

                      <Button
                        onClick={() => {
                          setRejectStatus(true);
                          setApplication(app);
                        }}
                        className="bg-red-200 text-red-700"
                        variant="outline"
                      >
                        Reject
                      </Button>

                      <Button
                        onClick={() => {
                          dispatch(setUserContacts([user]));
                          dispatch(setSelectedUser(user));
                          router.push("/message");
                        }}
                        className="bg-green-200 text-green-700"
                        variant="outline"
                      >
                        Message
                      </Button>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="h-[30px] bg-orange-100 text-orange-400"
                  >
                    {app?.status}
                  </Badge>
                </div>
              );
            })}

            <DialogRejectStatus
              app={application}
              open={rejectStatus}
              setOpen={setRejectStatus}
            />
            <OpenProposal
              app={application}
              open={openProposal}
              setOpen={setOpenProposal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;
