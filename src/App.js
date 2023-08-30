import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import Login from "./Pages/Login";
import Inbox from "./Pages/Inbox";
function App() {
  return (
    <div className="App">
      <Switch>
        {" "}
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/inbox">
          <Inbox />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
