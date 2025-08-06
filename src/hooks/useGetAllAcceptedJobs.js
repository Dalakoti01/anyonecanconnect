"use client"
import { setFreelancersJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAcceptedJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllAcceptedJobs = async () => {
        try {
            const res = await axios.get(`/api/application/getAcceptedJobs`,{withCredentials: true})
            if(res.data.success){
                dispatch(setFreelancersJobs(res.data.applications))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllAcceptedJobs()
  } ,[dispatch])

}

export default useGetAllAcceptedJobs