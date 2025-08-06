"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setAdminJobs } from "@/redux/jobSlice";
import { useRouter } from "next/navigation";
// import { loadRazorpayScript } from "../shared/loadRazorpayScript ";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const DialogAcceptWork = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const router = useRouter();
  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { adminsJobs } = useSelector((store) => store.job);

  const handleAccept = async () => {
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay Interface failed to load ");
        return;
      }

      setOpen(false);
      const { data } = await axios.get(
        `${backendUri}/api/v1/payment/checkout/${selectedJob?.acceptedApplication}`,
        { withCredentials: true }
      );
      const { order, amount, applicationId, freelancerId, jobId } = data;
      console.log(data);
      let key;
      const res = await axios.get(`${backendUri}/api/v1/payment/getKey`, {
        withCredentials: true,
      });
      if (res.data.success) {
        key = res.data.api_key;
      }

      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "AnyoneOneCanConnect",
        description: "Final Payment ",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment Verificatoin Endpoint Hitted");
          const verification = await axios.post(
            `${backendUri}/api/v1/payment/paymentVerification`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              applicationId,
              freelancerId,
              jobId,
              amount,
              paymentType: "Complete",
            },
            { withCredentials: true }
          );
          if (verification.data.success) {
            const res = await axios.get(
              `${backendUri}/api/v1/job/acceptWork/${selectedJob?._id}`,
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
              dispatch(setUser(res.data.updatedClient));
              toast.success(res.data.message);
              router.push("/client/rateFreelancer");
            }
          }
        },
        prefill: {
          name: user?.fullName,
          email: user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const submitHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/job/acceptWork/${selectedJob?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(
          setAdminJobs(
            adminsJobs.map((job) =>
              job._id === res.data.job._id ? res.data.job : job
            )
          )
        );
        toast.success(res.data.message);
        router.push(`/client/rateFreelancer/${selectedJob?._id}`);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3 text-xl">
            Accepting means work is final and complete.
          </DialogTitle>
          <div className="bg-yellow-200 rounded-lg text-orange-900 p-3">
            <DialogDescription className="text-orange-600">
              Note : Only Click on Accept if you are happy with the full work
              and do not need any revisions as once it is accepted the payment
              will be released to the freelancer
            </DialogDescription>
          </div>

          <div className="w-full pt-3 flex justify-center gap-14">
            {loading ? (
              <Button className="bg-blue-700 text-white">
                Please Wait ... <Loader2 />
              </Button>
            ) : (
              <Button
                onClick={submitHandler}
                variant="outline"
                className="bg-blue-700 text-white "
              >
                Accept Work
              </Button>
            )}

            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAcceptWork;
