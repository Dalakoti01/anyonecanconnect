"use client"

import { setAllNotifications } from '@/redux/rtnSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllNotifications = (refreshTrigger) => {
 
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchAllNotifications =  async() => {
            try {
                const res = await axios.get(`/api/notification/getNotifications`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllNotifications(res.data.notifications))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllNotifications()
    },[dispatch,refreshTrigger])
}

export default useGetAllNotifications