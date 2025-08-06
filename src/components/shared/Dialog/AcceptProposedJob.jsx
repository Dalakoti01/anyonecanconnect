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
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
// import { loadRazorpayScript } from "./shared/loadRazorpayScript ";

const AcceptProposedJob = ({ open, setOpen, messageId }) => {
  const router = useRouter();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const { selectProjectBrief } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleAccept = async () => {
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay Failed To Load");
        return;
      }

      setOpen(false);
      const { data } = await axios.get(
        `/api/payment/breifCheckout/${selectProjectBrief?._id}`,
        { withCredentials: true }
      );
      const { order, amount, freelancerId, jobId } = data;

      const options = {
        key: "rzp_test_xAeHddZmeW1vvn",
        amount: order.amount,
        currency: "INR",
        name: "AnyoneOneCanConnect",
        description: "Advance Payment ",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment Verificatoin Endpoint Hitted");
          const verification = await axios.post(
            `${backendUri}/api/v1/payment/breifPaymentVerification`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              freelancerId,
              jobId,
              amount,
              paymentType: "Advance",
            },
            { withCredentials: true }
          );
          if (verification.data.success) {
            const res = await axios.get(
              `/api/job/confirmProposedJob/${messageId}`,
              { withCredentials: true }
            );
            if (res.data.success) {
              toast.success(res.data.message);
              router.push("/client/myJobs");
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
  const acceptProposal = async () => {
    try {
      console.log("jobId", messageId);

      const res = await axios.get(`/api/job/confirmProposedJob/${messageId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/client/myJobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure? You Want To Accept This Proposal.
          </DialogTitle>
          <div className="flex justify-center gap-10 pt-7">
            {loading ? (
              <Button className="w-[150px] bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
                Please Wait ...{" "}
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button
                onClick={acceptProposal}
                variant="outline"
                className="w-[150px] bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
              >
                Yes
              </Button>
            )}

            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="w-[150px] bg-red-600 text-white hover:bg-red-700 hover:text-white"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptProposedJob;
