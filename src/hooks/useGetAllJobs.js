"use client"

import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const disptatch = useDispatch();

  return useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`/api/job/getAllJobs`, {
          withCredentials: true,
        });
        if(res.data.success){
            disptatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs()
  }, [ disptatch]);
};

export default useGetAllJobs;
