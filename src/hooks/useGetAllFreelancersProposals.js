"use client"
import { setAllApplications, setAllProposals } from '@/redux/applicationSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllFreelancersProposals = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllProposals = async () => {
        try {
            const res =  await axios.get(`/api/job/viewJobProposal`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllProposals(res.data.applications))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllProposals()
  },[dispatch])
}

export default useGetAllFreelancersProposals