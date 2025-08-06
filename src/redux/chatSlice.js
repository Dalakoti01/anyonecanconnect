import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name : "chat",
    initialState : {
        onlineUsers : [],
        messages : [],
        selectedMessage : null,
        unreadMessage : {}
    },
    reducers : {
        setOnlineUsers : (state,action) => {
            state.onlineUsers = action.payload
        },
        setMessages : (state,action) => {
            state.messages = Array.isArray(action.payload) ? action.payload : [action.payload];
        },
        setSelectedMessage : (state,action) => {
            state.selectedMessage = action.payload
        },
        increamentUnreadMessage : (state,action) => {
            const senderId = action.payload
            if(state.unreadMessage[senderId]){
                state.unreadMessage[senderId] += 1 
            } else {
                state.unreadMessage[senderId] = 1
            }
        },
        clearUnreadMessage : (state,action) => {
            const senderId = action.payload
            state.unreadMessage[senderId] = 0
        }
    }
})

export const {setMessages,setOnlineUsers,increamentUnreadMessage,clearUnreadMessage,setSelectedMessage} = chatSlice.actions
export default chatSlice.reducer