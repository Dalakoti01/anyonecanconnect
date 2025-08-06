"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

const DialogPaymentReciept = ({ open, setOpen }) => {
  const [loading,setLoading] = useState()
    const {selectedPayment} = useSelector((store) => store.payment)
    const submitHandler = async () => {
        try {
          setLoading(true)
            const res = await axios.get(`/api/payment/getPaymentReciept/${selectedPayment?._id}` ,{withCredentials : true})
            if(res.data.success){
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
          setLoading(false)
        }
    }
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl" >
        <DialogHeader>
          <DialogTitle className ="text-center  ">Do You Want A Payment Reciept</DialogTitle>
          <div className='w-full flex justify-around pt-7 gap-5'>
            {loading? <Button variant="outline"  className="bg-green-700 text-white"><Loader2 className='animate-spin mr-2 h-2 w-2'/> Please Wait</Button>
: <Button variant="outline" onClick={submitHandler} className="bg-green-700 text-white">Yes I Want A Payment Reciept</Button>
}
<Button onClick = {() => setOpen(false)} variant="outline">No I dont Want A Payment Reciept</Button>

          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPaymentReciept;
