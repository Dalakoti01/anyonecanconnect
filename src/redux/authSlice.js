import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Initial user state
    loading : false,
    suggestedFreelancers : [],
    verifiedFreelancers : [],
    selectedUser : null,
    userContacts : [],
    messagingClients : [],
    hiringAssistants : []
  },
  reducers: {
    setUser :(state, action) =>{
      state.user = action.payload; // Update the user state
    },
    setLoading : (state,action) => {
      state.loading =  action.payload
    },
    setSuggestedFreelancers : (state,action) => {
      state.suggestedFreelancers = action.payload;
    },
    setVerifiedFreelancer : (state,action) => {
      state.verifiedFreelancers = action.payload;
    },
    setSelectedUser : (state,action) => {
      state.selectedUser = action.payload
    },
    setUserContacts : (state,action) => {
      state.userContacts = action.payload
    },
    clearUserContacts : (state) => {
      state.userContacts = []
    },
    removeUserContact : (state,action) => {
      state.userContacts = state.userContacts.filter((contact) => contact._id !== action.payload)
    },
    setMessagingClients : (state,action) => {
      state.messagingClients = action.payload
    },
    removeMessagingClients : (state,action) => {
      state.messagingClients = state.messagingClients.filter((client) => client._id !== action.payload)
    },
    setHiringAssistants : (state,action) => {
      state.hiringAssistants = action.payload
    }

  },
});

export const { setUser,setLoading,setSuggestedFreelancers,setVerifiedFreelancer,setSelectedUser,setUserContacts,clearUserContacts,removeUserContact,setMessagingClients,removeMessagingClients,setHiringAssistants } = authSlice.actions;
export default authSlice.reducer;
