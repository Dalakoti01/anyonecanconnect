"use client"

import { setAllApplications } from '@/redux/applicationSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllFreelancersApplication = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllApplications = async() =>{
        try {
            const res = await axios.get(`/api/application/getAppliedJobs`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllApplications(res.data.applications))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllApplications()
  },[dispatch])

}

export default useGetAllFreelancersApplication