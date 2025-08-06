"use client"

import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetUserRank = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((store) => store.auth)

    useEffect(() => {
        const fetchUserRank =  async() => {
            try {
                const res = await axios.get(`/api/user/getRank`,{withCredentials : true})
                if(res.data.success){
                    dispatch(setUser({...user,rank : res.data.rank}))
                }
            } catch (error) {
                console.log(error);

                
            }
        }
        fetchUserRank()
    },[dispatch])
  
}

export default useGetUserRank