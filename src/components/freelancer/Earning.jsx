'use client'

import React from "react";
import { ArrowUp } from "lucide-react";

const Earning = () => {
  return (
    <div className="w-full h-full pt-5">
      <div className="pb-5 w-full min-h-screen h-full bg-[#F5F5F5]">
        <div className="w-full flex justify-center">
          <div className="mt-7 flex justify-between w-full max-w-6xl">
            <h1 className="font-bold text-2xl">Transaction Management</h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-4 gap-5 mt-7">
            {/* Total Transactions */}
            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-blue-600 rounded-xl bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500">Total Transactions</h1>
              <h1 className="font-bold text-2xl">0</h1>
              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-blue-600 flex gap-2">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            {/* Pending Amount */}
            <div className="shadow-2xl rounded-xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-pink-600 bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500">Pending Amount</h1>
              <h1 className="font-bold text-2xl">0</h1>
              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-pink-600 flex gap-2">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            {/* Completed Payments */}
            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 rounded-xl border-b-4 border-green-600 bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500">Completed Payments</h1>
              <h1 className="font-bold text-2xl">0</h1>
              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-green-600 flex gap-2">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            {/* Overdue Payments */}
            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-red-600 rounded-xl bg-white flex flex-col gap-4 p-5">
              <h1 className="text-slate-500">Overdue Payments</h1>
              <h1 className="font-bold text-2xl">0</h1>
              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-red-600 flex gap-2">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table Header */}
        <div className="w-full flex justify-center">
          <div className="bg-slate-100 text-sm text-slate-600 p-4 mt-10 shadow-2xl rounded-lg w-full max-w-6xl grid grid-cols-7 gap-3">
            <h1>Transaction ID</h1>
            <h1>Client Name</h1>
            <h1>Service</h1>
            <h1>Date</h1>
            <h1>Amount</h1>
            <h1>Status</h1>
            <h1>Actions</h1>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Earning;
