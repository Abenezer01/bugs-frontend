import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "./actionCreator/api";

const bugsSlice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    lastFetch: null,
    loading: true,
  },
  reducers: {
    bugReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.lastFetch = Date.now();
      bugs.loading = false;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugRequestFailed:(bugs,action)=>{
        bugs.loading=false
    },
    bugRemoved: (bugs, action) => {
    const index=bugs.list.findIndex((bug) => bug.id === action.payload.id);
      delete bugs.list[index];
    },
    bugResolved: (bugs, action) => {
      const index=bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

export default bugsSlice.reducer
const {bugAdded,bugReceived,bugRequested,bugRequestFailed,bugResolved}=bugsSlice.actions
const url='/bugs'
//action creator by functions

export const loadBugs=()=>(dispatch,getState)=>{
  console.log(getState())
    const {lastFetch}=getState().bugs
    if(moment().diff(moment(lastFetch),'minute')>10)return 
    dispatch(apiCallBegan({
        url,
        method:'get',
        onStart:bugRequested.type,
        onError:bugRequestFailed.type,
        onSuccess:bugReceived.type
    }))
}
export const addBug=(data,onHistory=null)=>apiCallBegan({
    url,
    method:'post',
    onHistory,
    data:data,
    onSuccess:bugAdded.type   
})
export const resolveBug=(id,onHistory=null)=>apiCallBegan({
  url:url+'/'+id,
  method:'patch',
  data:{resolved:true},
  onSuccess:bugResolved,
  onHistory
})