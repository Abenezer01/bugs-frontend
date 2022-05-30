import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    initialState:{
        list:[],
    },
    name:'carts',
    reducers:{
        cartItemAdded:(carts,action)=>{
            const index=carts.list.findIndex(item=>item.id===action.payload.id)
            if(index>-1){
                console.log('index',index)
                carts.list[index].count++;
            }else{
                carts.list.push(action.payload)            
            }

        },
        cartItemRemoved:(carts,action)=>{
           const index=carts.list.findIndex(cart=>cart.id===action.payload.id)
           if(carts.list[index]?.count && carts.list[index].count>1){
               carts.list[index].count--
           }else{
           carts.list.splice(index, 1);

           }
        }
    }
})
export default cartSlice.reducer
const {cartItemAdded,cartItemRemoved}=cartSlice.actions
export const addToCart=(item)=>cartItemAdded(item)
export const removeFromCart=(item)=>cartItemRemoved(item)