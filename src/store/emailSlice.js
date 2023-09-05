import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sentBox:[],
    isChanged:false,
    inboxChange:false,
    inbox:[]
}
const emailSlice=createSlice({
    name:"email",
    initialState:initialState,
    reducers:{
        sentBoxFn(state,action){

            state.sentBox.push(action.payload);
            // console.log(state.sentBox);
            state.isChanged=true;


        },

        replaceSentBox(state,action){
            state.sentBox=action.payload.sentBox;
        },
        inboxFn(state,action){

            // state.sentBox.push(action.payload);
            // console.log(state.sentBox);
            // state.isChanged=true;


        },

        replaceInbox(state,action){
            state.inbox=action.payload.inbox;
        },

        deleteMail(state,action){
            state.inbox=state.inbox.filter(item=>item.id!==action.payload)
        },


    }
})
export const emailActions= emailSlice.actions;
export default emailSlice.reducer;