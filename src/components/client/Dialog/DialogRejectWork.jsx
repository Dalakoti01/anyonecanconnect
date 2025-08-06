"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const DialogRejectWork = ({ open, setOpen }) => {
  const [loading,setLoading] = useState(false);
  const router = useRouter()
  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { adminsJobs } = useSelector((store) => store.job);

  const [input,setInput] = useState("")
  const submitHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/job/incompleteWork/${selectedJob?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(
          setAdminJobs(
            adminsJobs.map((job) =>
              job._id === res.data.job._id ? res.data.job : job
            )
          )
        );
        toast.success(res.data.message);
        router.push("/client/myJobs")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3">
            Incomplete Means Freelancer Has Not Fulfilled Project Requirements
          </DialogTitle>
          <div className="bg-yellow-200 rounded-lg  text-orange-900 p-3">
            <DialogDescription className="text-orange-600">
              Note : Only Click on Incomplete if the work submitted by the
              freelancer does'nt meet the requirements mentioned in the project
              . If the Work submitted just require minor twaeks then you can
              select on the Resubmit For Improvement
            </DialogDescription>
          </div>

          <div className="w-full flex justify-center pt-3 gap-14">
           {loading ? (
  <Button className="bg-blue-700 text-white">
    Please Wait ... <Loader2 />
  </Button>
) : (
  <Button onClick={submitHandler} variant="outline" className="bg-blue-700 text-white">
    Incomplete
  </Button>
)}


           
            <Button onClick={() => setOpen(false) } variant="outline"> Cancel</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRejectWork;
