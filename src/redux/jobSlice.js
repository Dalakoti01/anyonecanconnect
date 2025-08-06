import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    searchedQuery: "",
    adminsJobs: [],
    selectedJob: null,
    freelancersJobs: [],
    allJobs: [],
    selectProjectBrief : null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminsJobs = action.payload;
    },
    updateAdminJob: (state, action) => {
      const updatedJob = action.payload;
      state.adminsJobs = state.adminsJobs.map((job) =>
        job?._id === updatedJob?._id ? updatedJob : job
      );
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setFreelancersJobs: (state, action) => {
      state.freelancersJobs = action.payload;
    },
    updateSingleJob: (state, action) => {
      const updatedJob = action.payload;
      state.allJobs = state.allJobs.map((job) =>
        job._id === updatedJob._id ? updatedJob : job
      );
    },
    updateFreelancersJob: (state, action) => {
      const updatedJob = action.payload;
    
      const updatedJobs = state.freelancersJobs.map((application) => {
        if (application.job._id === updatedJob._id) {
          return {
            ...application,
            job: {
              ...application.job, // 👈 preserve previous job fields (like owner)
              ...updatedJob, // 👈 overwrite updated fields
            },
          };
        }
        return application;
      });
    
      state.freelancersJobs = updatedJobs;
    },
    setAllJobs : (state,action) => {
      state.allJobs = action.payload
    },
    
    setSelectedProjectBrief : (state,action) => {
      state.selectProjectBrief =  action.payload
    }
    
    
    
    
  },
});

export const {
  setJobs,
  setSearchedQuery,
  updateSingleJob,
  setAdminJobs,
  setSelectedJob,
  setFreelancersJobs,
  updateAdminJob,
  updateFreelancersJob,
  setAllJobs,
  setSelectedProjectBrief
} = jobSlice.actions;
export default jobSlice.reducer;
