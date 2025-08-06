"use client"

import React, { useState } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { IndianRupee, Loader2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { loadRazorpayScript } from "../shared/loadRazorpayScript ";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";

const OpenProposal = ({ open, setOpen, app }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store => store.auth)
  const dispatch = useDispatch();

  

//   const handleAccept = async () => {
//     try {
//       // Step 1: Create Razorpay Order from backend
//       const loaded = await loadRazorpayScript();

//       if (!loaded) {
//         alert("Razorpay SDK failed to load. Are you online?");
//         return;
//       }
//       console.log("Calling checkout with app ID:", app?._id);

//       setOpen(false)
//       const { data } = await axios.get(
//         `/api/payment/checkout/${app?._id}`,
//         {withCredentials : true}
//       );

//       const { order, amount, applicationId, freelancerId, jobId } = data;
//       let key;
//       const res = await axios.get(`/api/payment/getKey`, {withCredentials : true});
//       if(res.data.success){
//         key = res.data.api_key;
//       }
      

//       // Step 2: Trigger Razorpay Payment
//       const options = {
//         key: key, // from .env
//         amount: order.amount,
//         currency: "INR",
//         name: "DirectConnect", // your platform name
//         description: "Job Payment",
//         order_id: order.id,
//         handler: async function (response) {
//           // Step 3: On Payment Success, verify on backend
//             console.log("Payment verified endpoint hit");

//           const verification = await axios.post(
//             `/api/v1/payment/paymentVerification`,
//             {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//               applicationId,
//               freelancerId,
//               jobId,
//               amount,
//               paymentType: "Advance",
//             },
//             { withCredentials: true }
//           );

//           // Step 4: Only if verification is successful, update application/job status
//           if (verification.data.success) {
//             const res = await axios.post(
//               `/api/application/updateStatus/${app?._id}`,
//               { status: "accepted" },
//               { withCredentials: true }
//             );

//             if (res.data.success) {
//               dispatch(setUser(res.data.updatedClient))
//               toast.success(res.data.message);
//               router.push("/client/myJobs");
//             }
//           }
//         },
//         prefill: {
//           name: user?.fullName,
//           email: user?.email,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

  const acceptStatus = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/application/updateStatus/${app?._id}`,
        { status: "accepted" },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/client/myJobs");
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
      <DialogContent className="w-[900px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-4">
          <h1 className="text-xl font-bold">Proposal Details</h1>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 px-1 flex-1 space-y-6">
          {/* Cover Letter */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Cover Letter</h2>
            <div className="bg-slate-100 rounded-lg p-3">
              <p>{app?.applicant?.coverLetter}</p>
            </div>
          </div>

          {/* Approach */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Freelancer's Approach</h2>
            <div className="bg-slate-100 rounded-lg p-3">
              <p>{app?.applicant?.yourApproach}</p>
            </div>
          </div>

          {/* Proposal Info */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Proposal Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Bid Amount</p>
                <div className="flex items-center gap-2">
                  <IndianRupee />
                  <p>{app?.applicant?.yourBid}</p>
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Delivery Time</p>
                <p>{app?.applicant?.estimatedTimeLine}</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Availability</p>
                <p>Immediately</p>
              </div>

              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Revisions</p>
                <p>One time unlimited revisions</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">Portfolio Samples</p>
              <a
                className={
                  app?.applicant?.portfolio
                    ? "text-blue-600 cursor-pointer underline"
                    : "disabled text-slate-500"
                }
                href={
                  app?.applicant?.portfolio?.startsWith("http")
                    ? app.applicant.portfolio
                    : ``
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {app?.applicant?.[0]?.portfolio
                  ? "Link"
                  : "No Portfolio Submitted By The Freelancer"}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold">Questions For Client</p>
              <div className="bg-slate-100 rounded-lg p-3">
                <p>
                  {app?.applicant?.questionsForClient?.trim()
                    ? app.applicant.questionsForClient
                    : "No questions asked"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold">Payment Delivery Terms</p>
              {app?.applicant?.paymentDeliveryTerms?.trim() ? (
                <Badge
                  variant="outline"
                  className="text-blue-600 w-[137px] h-[30px] bg-blue-100"
                >
                  {app.applicant[0].paymentDeliveryTerms}
                </Badge>
              ) : (
                <p className="text-slate-500">
                  No specific payment delivery terms demanded
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="pt-4 border-t-2 border-slate-200">
          {loading ? (
            <Button
              variant="outline"
              className="w-full bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button
              onClick={acceptStatus}
              variant="outline"
              className="w-full bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
            >
              Accept Application
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenProposal;
