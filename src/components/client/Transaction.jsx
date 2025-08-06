"use client"

import React, { useState } from "react";
import { ArrowUp, Dot, Eye, File, Pencil, Plus, Search } from "lucide-react";
import useGetAllClientsPayments from "@/hooks/useGetAllClientsPayments";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPayment } from "@/redux/paymentSlice";
import DialogPaymentReciept from "./Dialog/DialogPaymentReciept";

const Transaction = () => {
  const dispatch = useDispatch()
  useGetAllClientsPayments()
  const {allPayments} = useSelector((store) => store.payment)
  const [openDialog,setOpenDialog] = useState(false)
  const arr = [1,2,3,4,5,6,7]
  let totalAmount = 0;
  let advanceTransaction = 0;
  let finalTransaction = 0;
  allPayments?.map((payment) => {
     totalAmount = totalAmount + payment?.amount
     if(payment?.status === "Half"){
      advanceTransaction = advanceTransaction + payment?.amount;
     } else {
      finalTransaction = finalTransaction + payment?.amount
     }
  })
  
  return (
    <div className="w-full">
      <div className="pb-5 w-full min-h-screen h-full bg-[#F5F5F5] ">
        <div className="w-full flex justify-center ">
          <div className="mt-7 flex  justify-between w-full max-w-7xl ">
            <h1 className="font-bold text-2xl">Transaction History</h1>
            {/* <Button variant="outline" className="bg-blue-600 transition-transform duration-300 hover:-translate-y-2 text-white p-4">
              <Plus /> Add Transaction
            </Button> */}
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="w-full max-w-7xl grid grid-cols-4 gap-5 mt-7">
            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-blue-600 rounded-xl bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Total Transactions</h1>
              <h1 className="font-bold text-2xl">{allPayments?.length}</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-blue-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0 % from last month</p>
              </div>
            </div>

            <div className="shadow-2xl rounded-xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-pink-600 bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Pending Amount</h1>
              <h1 className="font-bold text-2xl">{totalAmount - advanceTransaction}</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-pink-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 rounded-xl border-b-4 border-green-600 bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Completed Amount</h1>
              <h1 className="font-bold text-2xl">{finalTransaction}</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-green-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>

            <div className="shadow-2xl transition-transform duration-300 hover:-translate-y-2 border-b-4 border-red-600 rounded-xl bg-white flex flex-col gap-4 p-5 ">
              <h1 className="text-slate-500">Total Expenditure</h1>
              <h1 className="font-bold text-2xl">{totalAmount}</h1>

              <div className="bg-slate-200 p-2 w-3/4 rounded-2xl text-red-600 flex gap-2 ">
                <ArrowUp />
                <p className="text-sm">0% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex justify-center ">
          <div className="max-w-6xl mt-7 w-full bg-white shadow-2xl rounded-xl flex justify-between p-4">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="rounded-xl pl-10 w-full"
                type="text"
                placeholder="Search Transactions..."
              />
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allStatus">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Date : Last 30 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30">Date : Last 30 Days</SelectItem>
                  <SelectItem value="thisMonth">Date : This Month</SelectItem>
                  <SelectItem value="lastMonth">Date : Last Month</SelectItem>
                  <SelectItem value="customRange">Date : Custom Range</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Amount : All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Amount : All</SelectItem>
                  <SelectItem value="daPendingrk">{`Amount < $1000`} </SelectItem>
                  <SelectItem value="Paid">{`Amount < $1000 - $5000`} </SelectItem>
                  <SelectItem value="Overdue">{`Amount > $5000`} </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}

        <div className="w-full flex justify-center ">
          <div className="bg-slate-100 text-sm text-slate-600 p-4 mt-10 shadow-2xl rounded-lg w-full max-w-7xl grid grid-cols-7 gap-3">
            <h1>Transaction ID	</h1>
            <h1>Freelancers Name	</h1>
            <h1>Service</h1>
            <h1>Date</h1>
            <h1>Amount</h1>
            <h1>Status	</h1>
            <h1>Actions
            </h1>
          </div>
          
          
        </div>
        <div className="w-full flex justify-center">
        <div className="max-w-7xl w-full  mb-20 bg-white   ">
          {allPayments?.map((payment) => <div className="grid w-full  p-4 grid-cols-7 hover:bg-slate-100 gap-4" key={payment?._id}>
          <h1 className="text-xs">{payment?._id}	</h1>
            <h1 className="text-sm" >{payment?.freelancer?.fullName}	</h1>
            <h1 className="text-sm">{payment?.job?.title}	</h1>
            <h1 className="text-sm">{payment?.job?.createdAt.split("T")[0]}	</h1>
            <h1 className="text-sm">{payment?.amount}	</h1>
            <div className=" text-green-600 flex justify-center items-center w-[70px] h-[40px]  bg-slate-200 rounded-xl">
            <Dot size={"20px"} />
            <h1 className="">Paid</h1>
            </div>
            <div className="flex gap-2 mt-2">
            {/* <Eye className="cursor-pointer" size={"20px"} />
            <Pencil className="cursor-pointer" size={"20px"} /> */}
            <File onClick={() => {{setOpenDialog(true); dispatch(setSelectedPayment(payment))} console.log("somethisn");
            }} className="cursor-pointer" size={"20px"} />
            </div>
          </div>)}

          <DialogPaymentReciept open={openDialog} setOpen={setOpenDialog}/>
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
