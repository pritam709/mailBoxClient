import { Route, Switch } from "react-router-dom";
import Home from "./Pages/ComposeMail";
import "./App.css";
import Login from "./Pages/Login";
import Inbox from "./Pages/Inbox";
import SentBox from "./Pages/SentBox";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentEmailsData } from "./store/emailActions";
import { fetchSentBox } from "./store/emailActions";

function App() {
 const dispatch= useDispatch();
 const isLogin= useSelector(state=>state.auth.isLogin)

 const email= useSelector(state=>state.email);
 const isChanged= useSelector(state=>state.email.isChanged);
 useEffect(() => {
     dispatch(fetchSentBox());
   }, [dispatch]);


 useEffect(()=>{

     if(isChanged){
         dispatch(sentEmailsData(email))
         
     }

 },[dispatch,isChanged])
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
        {isLogin && <Route path="/inbox">
          <Inbox />
        </Route>}
       {isLogin && <Route path="/sentbox">
          <SentBox />
        </Route>}
        <Route path="*" >
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
