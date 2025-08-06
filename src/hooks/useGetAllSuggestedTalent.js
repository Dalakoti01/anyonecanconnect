"use client"

import { setSuggestedFreelancers } from '@/redux/authSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllSuggestedTalent = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchSuggestedFreelancers = async () => {
        try {
            const res = await axios.get(`/api/user/suggestedFreelancers`,{withCredentials : true})
            if(res.data.success){
                dispatch(setSuggestedFreelancers(res.data.users))
            }
        } catch (error) {
            console.log(error);
            
        }


    }
    fetchSuggestedFreelancers()
  },[dispatch])
}

export default useGetAllSuggestedTalent