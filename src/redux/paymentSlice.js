import { createSlice } from "@reduxjs/toolkit";

const paymentSlice =  createSlice({
    name : "payment",
    initialState : {
        allPayments : [],
        selectedPayment : null
    },
    reducers : {
        setAllPayments : (state,action)=> {
            state.allPayments = action.payload
        },
        setSelectedPayment : (state,action) => {
            state.selectedPayment = action.payload
        }
    }
})

export const {setAllPayments,setSelectedPayment} = paymentSlice.actions;
export default paymentSlice.reducer;