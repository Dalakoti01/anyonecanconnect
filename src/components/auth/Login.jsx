'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
// import GoogleLoginButton from '@/components/shared/GoogleButton'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {  setUser } from '@/redux/authSlice'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const [input, setInput] = useState({ identifier: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  // const clearInputs = () => setInput({ identifier: '', password: '' })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log("input data",input);
      
      setLoading(true)
      const res = await axios.post(`/api/user/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
        const role = res.data.user?.role
        if (role === 'freelancer') router.push('/freelancer/freelancersHome')
        else if (role === 'client') router.push('/client/dashboard')
        else if (role === 'admin') router.push('/adminPanel')
        else router.push('/')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="flex px-12 py-12 shadow-xl rounded-xl flex-col gap-14 max-w-xl border-2 bg-white">
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-xl mb-5 text-black">Account Login</h1>
          <div className="flex flex-col text-black gap-5">
            <div className=' flex flex-col gap-2'>
              <Label>Email Or Username</Label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                name="identifier"
                value={input.identifier}
                onChange={changeEventHandler}
              />
            </div>
            <div className=' flex flex-col gap-2'>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-12">
              <div className="flex flex-col">
                <Link href="/signup" className="text-sm cursor-pointer">Don't Have An Account?</Link>
              </div>
              <p onClick={() => router.push('/forget-password')} className="text-sm cursor-pointer">Forget Password?</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            <Button
              className="bg-white cursor-pointer text-black shadow-md hover:bg-blue-500 hover:text-white text-xl py-5"
              type="submit"
              variant="outline"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                'Login'
              )}
            </Button>
            {/* <GoogleLoginButton clearInputs={clearInputs} /> */}
            <Button
  onClick={() => signIn("google",{callbackUrl:"/processing"})}
  className="bg-white text-black cursor-pointer border py-5 text-xl flex items-center justify-center gap-3 hover:bg-gray-100"
  type="button"
>
  <FcGoogle size={24} />
  Sign in with Google
</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
