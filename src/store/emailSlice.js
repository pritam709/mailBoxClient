import { createSlice } from "@reduxjs/toolkit";

const initialState={
    sentBox:[],
    isChanged:false
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
        }



    }
})
export const emailActions= emailSlice.actions;
export default emailSlice.reducer;