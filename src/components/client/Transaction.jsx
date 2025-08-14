"use client";

import React, { useState } from "react";
import { ArrowUp, Dot, File } from "lucide-react";
import useGetAllClientsPayments from "@/hooks/useGetAllClientsPayments";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPayment } from "@/redux/paymentSlice";
import DialogPaymentReciept from "./Dialog/DialogPaymentReciept";

const Transaction = () => {
  const dispatch = useDispatch();
  useGetAllClientsPayments();
  const { allPayments } = useSelector((store) => store.payment);
  const [openDialog, setOpenDialog] = useState(false);

  let totalAmount = 0;
  let advanceTransaction = 0;
  let finalTransaction = 0;

  allPayments?.forEach((payment) => {
    totalAmount += payment?.amount;
    if (payment?.status === "Half") {
      advanceTransaction += payment?.amount;
    } else {
      finalTransaction += payment?.amount;
    }
  });

  return (
    <div className="w-full">
      <div className="pb-5 w-full min-h-screen h-full bg-[#F5F5F5]">
        {/* Title */}
        <div className="w-full flex justify-center">
          <div className="mt-7 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full max-w-7xl gap-3">
            <h1 className="font-bold text-xl sm:text-2xl text-center sm:text-left">
              Transaction History
            </h1>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
            {/* Total Transactions */}
            <div className="shadow-2xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-blue-600 rounded-xl bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500 text-sm sm:text-base">
                Total Transactions
              </h1>
              <h1 className="font-bold text-xl sm:text-2xl">
                {allPayments?.length}
              </h1>
              <div className="bg-slate-200 p-2 w-fit rounded-2xl text-blue-600 flex items-center gap-2">
                <ArrowUp size={18} />
                <p className="text-xs sm:text-sm">0 % from last month</p>
              </div>
            </div>

            {/* Pending Amount */}
            <div className="shadow-2xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-pink-600 rounded-xl bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500 text-sm sm:text-base">
                Pending Amount
              </h1>
              <h1 className="font-bold text-xl sm:text-2xl">
                {totalAmount - advanceTransaction}
              </h1>
              <div className="bg-slate-200 p-2 w-fit rounded-2xl text-pink-600 flex items-center gap-2">
                <ArrowUp size={18} />
                <p className="text-xs sm:text-sm">0 % from last month</p>
              </div>
            </div>

            {/* Completed Amount */}
            <div className="shadow-2xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-green-600 rounded-xl bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500 text-sm sm:text-base">
                Completed Amount
              </h1>
              <h1 className="font-bold text-xl sm:text-2xl">
                {finalTransaction}
              </h1>
              <div className="bg-slate-200 p-2 w-fit rounded-2xl text-green-600 flex items-center gap-2">
                <ArrowUp size={18} />
                <p className="text-xs sm:text-sm">0 % from last month</p>
              </div>
            </div>

            {/* Total Expenditure */}
            <div className="shadow-2xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-red-600 rounded-xl bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500 text-sm sm:text-base">
                Total Expenditure
              </h1>
              <h1 className="font-bold text-xl sm:text-2xl">{totalAmount}</h1>
              <div className="bg-slate-200 p-2 w-fit rounded-2xl text-red-600 flex items-center gap-2">
                <ArrowUp size={18} />
                <p className="text-xs sm:text-sm">0 % from last month</p>
              </div>
            </div>
          </div>
        </div>

     {/* Table Header */}
<div className="w-full flex justify-center overflow-x-auto">
  <div className="bg-slate-100 text-xs sm:text-sm text-slate-600 p-4 mt-10 shadow-2xl rounded-lg w-full max-w-7xl">
    {/* Mobile header */}
    <div className="grid grid-cols-1 gap-2 sm:hidden">
      <h1>Transaction ID</h1>
      <h1>Freelancers Name</h1>
      <h1>Service</h1>
      <h1>Date</h1>
      <h1>Amount</h1>
      <h1>Status</h1>
      <h1>Actions</h1>
    </div>

    {/* Desktop header */}
    <div className="hidden sm:grid sm:grid-cols-7 gap-3">
      <h1>Transaction ID</h1>
      <h1>Freelancers Name</h1>
      <h1>Service</h1>
      <h1>Date</h1>
      <h1>Amount</h1>
      <h1>Status</h1>
      <h1>Actions</h1>
    </div>
  </div>
</div>

{/* Table Body */}
<div className="w-full flex justify-center">
  <div className="max-w-7xl w-full mb-20 bg-white">
    {allPayments?.map((payment) => (
      <div
        key={payment?._id}
        className="p-4 border-b border-gray-200 hover:bg-slate-100 
                   text-xs sm:text-sm 
                   flex flex-col sm:grid sm:grid-cols-7 gap-4"
      >
        {/* Mobile layout */}
        <div className="sm:hidden flex flex-col gap-1">
          <p><span className="font-bold">Transaction ID:</span> {payment?._id}</p>
          <p><span className="font-bold">Freelancer:</span> {payment?.freelancer?.fullName}</p>
          <p><span className="font-bold">Service:</span> {payment?.job?.title}</p>
          <p><span className="font-bold">Date:</span> {payment?.job?.createdAt.split("T")[0]}</p>
          <p><span className="font-bold">Amount:</span> {payment?.amount}</p>
          <div className="text-green-600 flex items-center w-fit px-2 py-1 bg-slate-200 rounded-xl">
            <Dot size={20} />
            <h1>Paid</h1>
          </div>
          <div className="flex gap-2 mt-2">
            <File
              onClick={() => {
                setOpenDialog(true);
                dispatch(setSelectedPayment(payment));
              }}
              className="cursor-pointer"
              size={20}
            />
          </div>
        </div>

        {/* Desktop layout */}
        <h1 className="hidden sm:block">{payment?._id}</h1>
        <h1 className="hidden sm:block">{payment?.freelancer?.fullName}</h1>
        <h1 className="hidden sm:block">{payment?.job?.title}</h1>
        <h1 className="hidden sm:block">{payment?.job?.createdAt.split("T")[0]}</h1>
        <h1 className="hidden sm:block">{payment?.amount}</h1>
        <div className="hidden sm:flex text-green-600 justify-center items-center w-[70px] h-[40px] bg-slate-200 rounded-xl">
          <Dot size={20} />
          <h1>Paid</h1>
        </div>
        <div className="hidden sm:flex gap-2 mt-2">
          <File
            onClick={() => {
              setOpenDialog(true);
              dispatch(setSelectedPayment(payment));
            }}
            className="cursor-pointer"
            size={20}
          />
        </div>
      </div>
    ))}
    <DialogPaymentReciept open={openDialog} setOpen={setOpenDialog} />
  </div>
</div>


      </div>
    </div>
  );
};

export default Transaction;
