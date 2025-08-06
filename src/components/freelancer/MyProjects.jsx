'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllAcceptedJobs from '@/hooks/useGetAllAcceptedJobs'
import { setSelectedJob } from '@/redux/jobSlice'
import { setSelectedUser } from '@/redux/authSlice'

import { 
  ArrowDownUp, Grid2x2, IndianRupee, ListFilter, 
  Search, TableOfContents 
} from 'lucide-react'
import { BsThreeDotsVertical } from 'react-icons/bs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import DialogSubmitWork from './Dialog/DialogSubmitWork'

const MyProjects = () => {
  useGetAllAcceptedJobs()
  const router = useRouter()
  const dispatch = useDispatch()
  
  const { freelancersJobs } = useSelector((store) => store.job)
  const [popover, setPopover] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [changeLayout, setChangeLayout] = useState('grid')
  const [submit, setSubmit] = useState(false)
  const [jobId, setJobId] = useState('')
  const [searchItem, setSearchItem] = useState('')

  const statusFilter = [
    { label: 'All Jobs', value: '' },
    { label: 'Paused', value: 'paused' },
    { label: 'Completed', value: 'completed' },
    { label: 'Progress', value: 'progress' }
  ]

  const filteredJobs = freelancersJobs?.filter((freelancerJob) => {
    const title = freelancerJob?.job?.title?.toLowerCase() || ''
    const status = freelancerJob?.job?.status
    return title.includes(searchItem.toLowerCase()) || status === searchItem
  })

  return (
    <div className="w-full h-full pt-5 min-h-screen bg-[#fcfcfc] pb-5">
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-7xl flex flex-col md:flex-row mt-7 md:justify-between gap-4">
          <h1 className="text-2xl font-bold">My Jobs</h1>
        </div>
      </div>

      {/* Filters and search */}
      <div className="w-full flex justify-center px-4">
        <div className="flex flex-col gap-4 mt-4 w-full pb-5 max-w-7xl bg-white rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 pt-4 gap-4">
            <div className="flex flex-col gap-2 w-full lg:w-auto">
              <h1 className="text-xl font-bold">Filter Jobs</h1>
              <div className="flex flex-wrap gap-2">
                {statusFilter.map((status, index) => (
                  <Button
                    key={index}
                    className={`${
                      activeButton === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-black'
                    } hover:bg-blue-600 hover:text-white`}
                    onClick={() => {
                      setActiveButton(index)
                      setSearchItem(status.value)
                    }}
                    variant="outline"
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 items-center w-full sm:w-auto">
              <Search size={20} className="text-gray-900" />
              <Input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search Jobs ..."
                type="text"
                className="w-full h-[30px] sm:w-64"
              />
            </div>
          </div>
          <div className="w-full border-t-2 border-gray-300 px-4"></div>
        </div>
      </div>

      {/* Layout toggle */}
      <div className="w-full flex justify-center mt-5">
        <div className="w-full max-w-7xl flex gap-3 ml-5">
          <Grid2x2
            onClick={() => setChangeLayout('grid')}
            size={40}
            className={`cursor-pointer shadow-2xl rounded-md p-2 ${
              changeLayout === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          />
          <TableOfContents
            onClick={() => setChangeLayout('table')}
            size={40}
            className={`cursor-pointer shadow-2xl rounded-md p-2 ${
              changeLayout === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          />
        </div>
      </div>

      {/* Grid or Table view */}
      <div className="w-full flex justify-center">
        {changeLayout === 'grid' ? (
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 rounded-lg p-2">
            {filteredJobs.map((application) => (
              <div key={application._id} className="py-5 px-3 shadow-xl rounded-xl bg-white flex flex-col gap-3">
                <div className="flex justify-between">
                  <h1 className="font-bold text-xl">{application.job.title}</h1>
                  <Badge className="rounded-lg h-[20px]">{application.job.status}</Badge>
                </div>
                <div className="flex justify-between gap-2 pb-2 border-b-2 border-gray-200">
                  <div className="flex gap-2 items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="image" />
                      <AvatarFallback>
                        {application.job.owner.fullName
                          ?.split(' ')
                          .map((word) => word[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-slate-500 text-sm mt-1">
                      {application.job.owner.fullName}
                    </p>
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="cursor-pointer">
                        <BsThreeDotsVertical />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[150px] text-sm">
                      <p
                        onClick={() => {
                          router.push('/selectDisputeType')
                          dispatch(setSelectedJob(application.job))
                        }}
                        className="cursor-pointer text-red-600 font-bold"
                      >
                        Raise Dispute
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-slate-500">Contract Type</p>
                  <h1>{application.job.budgetType}</h1>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-slate-500">Budget</p>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    <h1>{application.job.salary}</h1>
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-slate-500">Due Date</p>
                  <h1>
                    {application.job.applicationDeadline
                      ? new Date(application.job.applicationDeadline).toLocaleDateString()
                      : 'No Deadline'}
                  </h1>
                </div>

                <div className="flex justify-center items-center gap-12 mt-3">
                    {application?.job?.status === "progress" && (
                      <Button
                        onClick={() => {
                          setSubmit(true);
                          setJobId(application?.job?._id);
                        }}
                        variant="default"
                        className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                      >
                        Submit Work
                      </Button>
                    )}

                    {application?.job?.status === "paused" && (
                      <Button
                        onClick={() => {
                          // handlePausedClick(); // define this separately if needed
                        }}
                        disabled
                        variant="default"
                        className="bg-gray-300 text-gray-600 cursor-not-allowed"
                      >
                        Work Under Review
                      </Button>
                    )}

                    {application?.job?.status === "completed" && (
                      <Button
                        onClick={() => {
                          {
                            dispatch(setSelectedJob(application?.job));
                            router.push("/completedJobs");
                          }
                        }}
                        variant="outline"
                        className="text-blue-700 border-blue-700 hover:bg-blue-50"
                      >
                        View Detail
                      </Button>
                    )}

                    {application?.job?.status === "review" && (
                      <Button
                        onClick={() => {
                          dispatch(setSelectedJob(application?.job));
                          router.push(`/freelancer/viewRevision/${application?.job?._id}`);
                        }}
                        variant="outline"
                        className="border-2 border-yellow-500 text-black"
                      >
                        Complete Revision
                      </Button>
                    )}

                    {application?.job?.status === "disputes" && (
                      <Button
                        onClick={() => {
                          // handleDisputeClick(); // custom logic for disputes
                        }}
                        variant="default"
                        className="bg-red-200 text-red-700 hover:bg-red-300"
                      >
                        Resolve Dispute
                      </Button>
                    )}

                    <DialogSubmitWork
                      job={jobId}
                      open={submit}
                      setOpen={setSubmit}
                    />
                    {application?.job?.reviewGiven?.byFreelancer === false &&
                    application?.job?.status === "completed" ? (
                      <Button
                        onClick={() => {
                          dispatch(setSelectedJob(application));
                          router.push("/rateClient");
                        }}
                        className="bg-green-200 text-green-800"
                        variant="outline"
                      >
                        Give Review
                      </Button>
                    ) : application?.job?.status === "completed" ? (
                      <Button variant="outline">Rated</Button>
                    ) : (
                      <Button
                        onClick={() => {
                          dispatch(setSelectedUser(application?.job?.owner));
                          router.push("/message");
                        }}
                        variant="outline"
                      >
                        Message
                      </Button>
                    )}
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-7xl w-full mx-auto bg-white shadow-lg rounded-lg p-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Job Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>{application.job.title}</TableCell>
                    <TableCell>{application.job.owner.fullName}</TableCell>
                    <TableCell>{application.job.status}</TableCell>
                    <TableCell>₹{application.job.salary}</TableCell>
                    <TableCell>
                      <Button>Submit</Button>
                      <Button variant="outline" className="ml-2">
                        Message
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProjects
