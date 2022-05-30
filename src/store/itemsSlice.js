import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "./actionCreator/api";

const itemSlice=createSlice({
    name:'items',
    initialState:{
        list:[],
        lastFetch:null,
        loading:false
    },
    reducers:{
        itemAdded:(items,action)=>{
            items.list.push(action.payload)            
        },
        itemsRequested:(items,action)=>{
            items.loading=true
        },
        itemsRequestedFailed:(items,action)=>{
            items.loading=false
        },
        itemsReceived:(items,action)=>{
            items.list=action.payload
            items.loading=false
        },
        itemDelete:(items,action)=>{
           const index= items.list.findIndex(item=>item.id===action.payload.id)
           delete items.list[index]
        },
        itemUpdated:(items,action)=>{
            const index=items.list.findIndex(item=>item.id===action.payload.id)
            items.list[index]=action.payload
        }
    }
})
const url='/items'
export default itemSlice.reducer
const {itemAdded,itemsReceived,itemDelete,itemUpdated,itemsRequested,itemsRequestedFailed}=itemSlice.actions
export const loadItems=()=>(dispatch,getState)=>{
    const {lastFetch}=getState().items
    if(moment().diff(moment(lastFetch,'minute'))>10)return 
    dispatch(apiCallBegan({
        onStart:itemsRequested.type,
        onFailed:itemsRequestedFailed.type,
        onSuccess:itemsReceived.type,
        method:'get',
        url
    }))
}

//add bugs
export const addBug=(data)=>apiCallBegan({
    url,
    method:'post',
    data,
    onSuccess:itemAdded.type
})