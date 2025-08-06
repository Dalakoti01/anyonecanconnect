"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Loader2, MessageSquareX } from 'lucide-react'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const DialogUpdateUspSkill = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')
  const dispatch = useDispatch()


  const updateSkills = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`/api/user/updateProfile` ,{uspSkill : skills},{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(res.data.user))
        toast(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally { 
      setLoading(false)
    }
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className='flex flex-col mt-5'>
          <div className='flex gap-5'>
            <Input
              type="text"
              placeholder="Add Skills To Your Profile"
              name="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
            <Button
              variant="outline"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleAddSkill}
            >
              Add
            </Button>
          </div>

          <div className='flex gap-3 mt-5 flex-wrap'>
            {skills.map((skill, index) => (
              <Badge key={index} className="h-[40px]" variant="outline">
                {skill}
                <MessageSquareX
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveSkill(skill)}
                />
              </Badge>
            ))}
          </div>

          <div className='flex justify-end mt-5'>
            {loading ? (
              <Button disabled className="bg-blue-600 text-white hover:bg-blue-700">
                Saving... <Loader2 className="animate-spin h-4 w-4" />
              </Button>
            ):<Button onClick={updateSkills} variant="outline" className="bg-blue-600 text-white hover:text-white hover:bg-blue-700">
              Save Changes
            </Button> }
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogUpdateUspSkill
