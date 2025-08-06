"use client"

import { setAllUnreadNotification } from '@/redux/rtnSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllUnreadNotifications = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUnreadNotifications = async() => {
        try {
            const res = await axios.get(`/api/notification/getUnreadNotifications`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllUnreadNotification(res.data.notifications))
            }

        } catch (error) {
            console.log(error);
            
        }
    }
    fetchUnreadNotifications()
  },[dispatch])
}

export default useGetAllUnreadNotifications