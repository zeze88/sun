import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/configureStore";

import Main from "./page/Main";
import Signup from "./page/Signup";
import Post from "./page/Post";
import Login from "./page/Login";
import Create from "./page/Create";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main} />
      <Route path="/post" exact component={Post} />
      <Route path="/create" exact component={Create} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
    </div>
  );
}

export default App;
