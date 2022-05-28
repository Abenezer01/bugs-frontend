import axios from 'axios'

import { apiCallBegan, apiCallSuccess, apiCallFailed } from "../actionCreator/api"
const ApiMiddleware=(getState,dispatch)=>next=>async action=>{
    console.log('action',action)
    if (action.type !== apiCallBegan.type) return next(action);
    next(action)
    const {onStart,onError,onSuccess,method,data,url}=action.payload
    if(onStart) dispatch({type:onStart})
    try {
        const response=await axios({
            baseURL:'http://localhost:9001',
            method,
            url,
            data
        })

        //general response action
        dispatch({
            type:apiCallSuccess.type,
            payload:response.data
        })

        //specific response action
        if(onSuccess){
            dispatch({
                type:onSuccess,
                payload:response.data
            })
        }
    } catch (error) {
        //general error response action
        dispatch({
            type:apiCallFailed.type,
            payload:error.message
        })
         //specific error response action
         if(onError){
            dispatch({
                type:onError,
                payload:error.data
            })
        }
    }
}
export default ApiMiddleware