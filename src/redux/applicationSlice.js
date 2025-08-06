import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name : "application",
    initialState : {
        allApplications : [],
        allApplicants : [],
        selectedApplication : null,
        allProposals : [],
        selectedProposals : null
    },
    reducers : {
        setAllApplications : (state,action) => {
            state.allApplications = action.payload
        },
        updateSingleApplication : (state,action) => {
            const updateApplication = action.payload;
            state.allApplications = state.allApplications.map((application) =>
                application._id === updateApplication._id ? updateApplication : application
            );
        },
        setAllApplicants : (state,action) => {
            state.allApplicants = action.payload
        },
        setSelectedApplication : (state,action) => {
            state.selectedApplication = action.payload
        },
        setAllProposals : (state,action) => {
            state.allProposals = action.payload
        },
        setSelectedProposals : (state,action)=> {
            state.selectedProposals = action.payload
        }
    }
})

export const {setAllApplications,updateSingleApplication,setAllApplicants,setSelectedApplication,setSelectedProposals,setAllProposals} = applicationSlice.actions
export default applicationSlice.reducer