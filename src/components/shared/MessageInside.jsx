"use client";

import useGetAllMessage from "@/hooks/useGetAllMessage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import useRTM from "@/hooks/useRTM";
import { clearUnreadMessage } from "@/redux/chatSlice";
import { setSelectedProjectBrief } from "@/redux/jobSlice";
import { IndianRupee } from "lucide-react";
import DeclineJobProposal from "./Dialog/DeclineJobProposal";
import AcceptProposedJob from "./Dialog/AcceptProposedJob";
import UpdateProjectBrief from "./Dialog/UpdateProjectBrief";
import FreelancerAcceptBreif from "./Dialog/FreelancerAcceptBreif";

const MessageInside = ({ selectedUser }) => {
  useRTM(selectedUser);
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [declineProposal, setDeclineProposal] = useState(false);
  const [acceptProposal, setAcceptProposal] = useState(false);
  const [updateBrief, setUpdateBrief] = useState(false);
  const [acceptBreif, setAcceptBreif] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [proposalId, setProposalId] = useState("");

  useEffect(() => {
    if (selectedUser) {
      dispatch(clearUnreadMessage(selectedUser._id)); // Clear unread messages when opening chat
    }
  }, [selectedUser, dispatch]);

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex flex-col w-full items-center justify-center gap-5">
        <Avatar className="w-10 h-10">
          <AvatarImage
            className="object-cover cursor-pointer rounded-full"
            src={selectedUser?.profile?.profilePhoto}
          />
          <AvatarFallback className="w-13 h-13 cursor-pointer">
            CN
          </AvatarFallback>
        </Avatar>
        <p className="font-bold cursor-pointer">{selectedUser?.username}</p>
        <Button variant="secondary" className="bg-slate-200 hover:bg-slate-400">
          View Profile
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((msg) => {
            const isAnyBriefStatusNotSpecific = msg?.projectBrief?.some(
              (brief) => brief?.status !== "specific"
            );

            return (
              <div
                className={`flex ${
                  msg?.sendersId === user?._id ? "justify-end" : "justify-start"
                }`}
                key={msg._id}
              >
                <div
                  className={`p-2 rounded-lg break-words max-w-[70%] ${
                    msg?.sendersId === user?._id
                      ? "bg-blue-500 text-black"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {/* Message text */}
                  <p>{msg?.message}</p>

                  {/* Project Brief Card */}
                  {msg?.projectBrief?.length > 0 &&
                    msg.projectBrief.map((brief) => (
                      <div
                        key={brief._id}
                        className="mt-3 p-4 bg-white rounded-xl shadow-md border border-gray-300"
                      >
                        <h3 className="font-semibold text-xl mb-2">
                          {brief.title}
                        </h3>
                        <p className="text-gray-700 mb-2">
                          {brief.description}
                        </p>

                        <div className="text-sm text-gray-600 mb-4">
                          <p className="flex">
                            <span className="font-semibold">Salary:</span>{" "}
                            <IndianRupee size={"20px"} />
                            {brief?.salary}
                          </p>
                          <p>
                            <span className="font-semibold">Duration:</span>{" "}
                            {brief?.applicationDeadline.split("T")[0]}
                          </p>
                          <p>
                            <span className="font-semibold">Budget Type:</span>{" "}
                            {brief?.budgetType}
                          </p>
                          <p>
                            <span className="font-semibold">Deliverables:</span>{" "}
                            {brief?.delivarables}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          {msg?.sendersId === user?._id ? (
                            <>
                              <Button
                                onClick={() => {
                                  setUpdateBrief(true);
                                  setProposalId(brief?._id);
                                  console.log(brief);

                                  dispatch(setSelectedProjectBrief(brief));
                                }}
                                variant="outline"
                                disabled={isAnyBriefStatusNotSpecific}
                              >
                                Edit Proposal
                              </Button>
                              <Button
                                variant="destructive"
                                disabled={isAnyBriefStatusNotSpecific}
                                onClick={() => {
                                  setDeclineProposal(true);
                                  setMessageId(msg._id);
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            <>
                              {user?._id === brief?.owner ? (
                                <Button
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  disabled={isAnyBriefStatusNotSpecific}
                                  onClick={() => {
                                    setAcceptProposal(true);
                                    setProposalId(brief?._id);
                                    dispatch(setSelectedProjectBrief(brief));
                                  }}
                                >
                                  Accept and Pay Advance
                                </Button>
                              ) : (
                                <Button
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  disabled={isAnyBriefStatusNotSpecific}
                                  variant="outline"
                                  onClick={() => {
                                    setAcceptBreif(true);
                                    dispatch(setSelectedProjectBrief(brief));
                                  }}
                                >
                                  Accept Deal
                                </Button>
                              )}

                              <Button
                                className="bg-red-500 hover:bg-red-600 text-white"
                                disabled={isAnyBriefStatusNotSpecific}
                                onClick={() => {
                                  setDeclineProposal(true);
                                  setMessageId(msg._id);
                                }}
                              >
                                Decline
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        <FreelancerAcceptBreif open={acceptBreif} setOpen={setAcceptBreif} />
        <AcceptProposedJob
          open={acceptProposal}
          setOpen={setAcceptProposal}
          messageId={proposalId}
        />
        <DeclineJobProposal
          messageId={messageId}
          open={declineProposal}
          setOpen={setDeclineProposal}
        />
        <UpdateProjectBrief
          selectedJob={proposalId}
          open={updateBrief}
          setOpen={setUpdateBrief}
        />
      </div>
    </div>
  );
};

export default MessageInside;
