import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/ComposeMail";
import "./App.css";
import Login from "./Pages/Login";
import Inbox from "./Pages/Inbox";
import SentBox from "./Pages/SentBox";
import MailDetail from "./Pages/mailDetail";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentEmailsData } from "./store/emailActions";
import { fetchSentBox } from "./store/emailActions";
import { fetchinbox } from "./store/emailActions";
import SentMailDetail from "./Pages/SentMailDetail";

function App() {

  console.log("app re-run");
 const dispatch= useDispatch();
 const isLogin= useSelector(state=>state.auth.isLogin)

 const email= useSelector(state=>state.email);
 const isChanged= useSelector(state=>state.email.isChanged);
 useEffect(() => {
  console.log("1-st UE");
     dispatch(fetchSentBox());
    
   }, [dispatch,isLogin]);

   useEffect(() => {
  
    console.log("2-nd UE");
    const interval = setInterval(() => {
      dispatch(fetchinbox());
    }, 2000)
   
  }, [dispatch,isLogin]);


 useEffect(()=>{

     if(isChanged){
         dispatch(sentEmailsData(email))
         
     }

 },[email,dispatch,isChanged])
  return (
    <div className="App">
      <Switch>
        {" "}
        <Route path="/" exact>
          <Login />
        </Route>
        {isLogin && <Route path="/compose">
          <Home />
        </Route>}
        {isLogin && <Route path="/inbox" exact>
          <Inbox />
        </Route>}
       {isLogin && <Route path="/sentbox" exact>
          <SentBox />
        </Route>}
        {isLogin && <Route path="/inbox/:mailId" >
          <MailDetail/>
        </Route>}
        {isLogin && <Route path="/sentbox/:mailId" >
          <SentMailDetail/>
        </Route>}
        <Route path="*" >
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
