"use client"

import { setMessagingClients } from '@/redux/authSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllClients = () => {
 const disptach = useDispatch()
 useEffect(() => {
    const fetchAllClients = async () => {
        try {
            const res = await axios.get(`/api/message/getClientContacts` ,{withCredentials:true})
            if(res.data.success){
                disptach(setMessagingClients(res.data.clients))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllClients()
 } ,[disptach])
}

export default useGetAllClients