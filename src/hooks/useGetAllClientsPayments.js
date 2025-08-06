"use client"

import { setAllPayments } from '@/redux/paymentSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllClientsPayments = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllPayments = async () => {
            try {
                const res = await axios.get(`/api/payment/getAllClientsPayments`,{withCredentials : true})
                if(res.data.success){
                    dispatch(setAllPayments(res.data.payments))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllPayments()
    },[dispatch])
  
    
}

export default useGetAllClientsPayments