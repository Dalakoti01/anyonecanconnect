"use client"

import { setAdminJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAdminJobs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllJobs = async() => {
            try {
                const res = await axios.get(`/api/job/adminJobs`,{withCredentials : true})
                if (res.data.success) {
                    const jobs = Array.isArray(res.data.jobs) ? res.data.jobs : [res.data.jobs];
                    dispatch(setAdminJobs(jobs));
                  } else {
                    dispatch(setAdminJobs(jobs));
                  }
                  
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllJobs()
    },[dispatch])
}

export default useGetAdminJobs