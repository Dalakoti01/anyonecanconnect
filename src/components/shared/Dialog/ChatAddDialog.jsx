"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setUserContacts } from "@/redux/authSlice.js";

const ChatAddDialog = ({ open, setOpen }) => {
  const [visibleCount, setVisibleCount] = useState(7);
  const { suggestedFreelancers } = useSelector((store) => store.auth);
  const { userContacts } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Suggested Freelancers To Chat</DialogTitle>
        </DialogHeader>

        {/* Scrollable Container */}
        <div className="max-h-[400px] overflow-y-auto space-y-4 p-2">
          {suggestedFreelancers?.slice(0, visibleCount).map((freelancer) => (
            <div
              key={freelancer._id}
              className="bg-white p-3 rounded-md flex items-center gap-3 border shadow-sm"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={freelancer?.profile?.profilePhoto} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-sm font-medium truncate w-36">
                {freelancer?.fullName}
              </h1>
              <Button
                onClick={() =>
                  dispatch(setUserContacts([...userContacts, freelancer]))
                }
                disabled={userContacts.some(
                  (contact) => contact._id === freelancer._id
                )}
                className={`text-sm px-3 py-1 ml-auto ${
                  userContacts.some((contact) => contact._id === freelancer._id)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-700 text-white"
                }`}
              >
                {userContacts.some((contact) => contact._id === freelancer._id)
                  ? "Connected"
                  : "Connect"}
              </Button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < suggestedFreelancers?.length && (
          <Button
            onClick={() => setVisibleCount((prev) => prev + 7)}
            className="mt-3 w-full bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
          >
            See More
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatAddDialog;
