import { Route, Switch } from "react-router-dom";
import Home from "./Pages/ComposeMail";
import "./App.css";
import Login from "./Pages/Login";
import Inbox from "./Pages/Inbox";
import SentBox from "./Pages/SentBox";
import { useSelector } from "react-redux";

function App() {
 const isLogin= useSelector(state=>state.isLogin)
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
