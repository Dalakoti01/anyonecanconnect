"use client"

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog'
import { useDispatch } from 'react-redux';
import { setAllNotifications, setAllUnreadNotification } from '@/redux/rtnSlice';
import axios from 'axios';
import { Button } from '../../ui/button';
import toast from 'react-hot-toast';

const DialogDeleteAllNotification = ({open,setOpen}) => {
  const dispatch = useDispatch()
  const deleteAllNotifications = async () => {
    try {
      const res = await axios.delete(`/api/notification/deleteUsersAllNotifications`,{withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(setAllNotifications([]))
        dispatch(setAllUnreadNotification([]))
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete all your notifications
        and remove your notifications from our servers.
      </DialogDescription>

      <div className='flex justify-center gap-10 pt-7'>
        <Button onClick={deleteAllNotifications} variant = "outline" className="bg-blue-700 text-white w-[100px]">Yes</Button>
        <Button onClick = {() => setOpen(false)} variant = "outline" className="bg-red-700 text-white w-[100px]">No</Button>

      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default DialogDeleteAllNotification