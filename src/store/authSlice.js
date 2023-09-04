import { createSlice } from "@reduxjs/toolkit";
const storedToken=localStorage.getItem("token");
let isAthenticated=false;
let email;
if(storedToken){
  isAthenticated=true;
  email=localStorage.getItem("email");

}
const initialState={
    isLogin:isAthenticated,
    token:storedToken,
    email:email
}
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        login(state,action){
            state.isLogin=true;
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("email",action.payload.email);
            console.log(`logged in as ${action.payload.email}`);


        },
        logout(state){
            state.isLogin=false;
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            
        }
    }
})
export const authActions= authSlice.actions;
export default authSlice.reducer;