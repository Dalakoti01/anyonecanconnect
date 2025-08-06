import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
    name : "realTimeNotification",
    initialState : {
        unreadNotificationCount : {},
        messageNotifications : [],
        jobNotifications : [],
        allNotifications : [],
        unreadNotifications : []
        

    },
    reducers : {
        setMessageNotifications : (state,action) => {
            if(!state.messageNotifications){
                state.messageNotifications = []
            }
            state.messageNotifications.push(action.payload)
        },
        clearMessageNotifications : (state) => {
            state.messageNotifications = []
        },
        setJobNotifications : (state,action) => {
            if(!state.jobNotifications){
                state.jobNotifications = []
            }
            state.jobNotifications.push(action.payload)
        },
        clearJobNotifications : (state) => {
            state.jobNotifications = []
        },
        increamentUnreadNotificationCount : (state,action) =>{
            const sendersId = action.payload
            if(state.unreadNotificationCount[sendersId]){
                state.unreadNotificationCount[sendersId] += 1
            } else{
                state.unreadNotificationCount[sendersId] = 1
            }
        },
        clearUnreadNotificationCount : (state,action)=> {
            const sendersId = action.payload
            state.unreadNotificationCount[sendersId] = 0
        },
        setAllNotifications : (state,action) => {
            state.allNotifications = action.payload;
        },
        setAllUnreadNotification : (state,action) => {
            state.unreadNotifications = action.payload
        },
        addNotifications : (state,action) => {
            state.allNotifications.push(action.payload)
            state.unreadNotifications.push(action.payload)
        }
    }
})

export const {setMessageNotifications,clearMessageNotifications,setJobNotifications,clearJobNotifications,increamentUnreadNotificationCount,clearUnreadNotificationCount,setAllNotifications,setAllUnreadNotification,addNotifications} = rtnSlice.actions
export default rtnSlice.reducer