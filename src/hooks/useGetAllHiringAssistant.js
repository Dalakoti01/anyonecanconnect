"use client"

import { setHiringAssistants } from '@/redux/authSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllHiringAssistant = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllHiringAssistant = async() => {
            try {
                const res = await axios.get(`/api/user/getHiringAssistants`,{withCredentials : true})
                if(res.data.success){
                    dispatch(setHiringAssistants(res.data.hiringAssistants))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllHiringAssistant()
    },[dispatch])
  
}

export default useGetAllHiringAssistant