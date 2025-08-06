"use client"

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/chatSlice";

const UpdateProjectBrief = ({ open, setOpen, selectedJob }) => {
  const {selectProjectBrief} = useSelector(store => store.job)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { messages } = useSelector((store) => store.chat);
  const [input, setInput] = useState({
    title: selectProjectBrief?.title || "",
    description: selectProjectBrief?.description || "",
    delivarables: selectProjectBrief?.delivarables || "",
    salary: selectProjectBrief?.salary || "",
    duration: "",
    budgetType:selectProjectBrief?.budgetType || "",
  });

  const submitProjectBrief = async () => {
    try {
      setLoading(true);
      console.log(input);

      const body = {
        title: input.title,
        description: input.description,
        delivarables: input.delivarables,
        salary: input.salary,
        budgetType: input.budgetType,
        duration: input.duration,
      };
      const res = await axios.post(
        `/api/job/updateProposedJob/${selectedJob}`,
        body,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedMessages = messages.filter(
          (msg) =>
            msg.projectBrief &&
            msg.projectBrief.length > 0 &&
            msg.projectBrief[0]._id !== res.data.populatedMessage.projectBrief[0]._id
        );
        
        console.log(updatedMessages);
        
        // Then add the updated populatedMessage
        dispatch(setMessages([...updatedMessages, res.data.populatedMessage]));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="pb-3 border-b-2 border-slate-200">
            Create Project Brief
          </DialogTitle>
          <div className="flex flex-col gap-5 pt-5">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Project Title</h1>
              <Input
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Project Description</h1>
              <Textarea
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Delivarables</h1>
              <Textarea
                value={input.delivarables}
                onChange={(e) =>
                  setInput({ ...input, delivarables: e.target.value })
                }
                className="h-[200px]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Timeline</h1>
              <Select
                value={input.duration}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, duration: value }))
                }
              >
                <SelectTrigger className="w-[460px]">
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1week">1 week</SelectItem>
                  <SelectItem value="2week">2 week</SelectItem>
                  <SelectItem value="3week">3 week</SelectItem>
                  <SelectItem value="4week">4 week</SelectItem>
                  <SelectItem value="5week">5 week</SelectItem>
                  <SelectItem value="6week">6 week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Budget</h1>
              <Input
                value={input.salary}
                onChange={(e) => setInput({ ...input, salary: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Budget Type</h1>
            <Select
              value={input.budgetType}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, budgetType: value }))
              }
            >
              <SelectTrigger className="w-[460px]">
                <SelectValue placeholder="Select Timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="houlry">Hourly</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex justify-end">
              <div className="flex pt-3 gap-4">
                <Button onClick={() => setOpen(false)} variant="outline">
                  Close
                </Button>
                {loading ? (
                  <Button
                    variant="outline"
                    className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                  >
                    <Loader2 className="animate-spin mr-2 h-4 w-4 " /> Please
                    Wait
                  </Button>
                ) : (
                  <Button
                    onClick={submitProjectBrief}
                    className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                    variant="outline"
                  >
                    Submit Brief
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProjectBrief;
