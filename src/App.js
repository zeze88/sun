import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/configureStore";

import Main from "./page/Main";
import Post from "./page/Post";
import Login from "./page/Login";
import Create from "./page/Create";
import Test from "./page/Test";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main} />
      <Route path="/post" exact component={Post} />
      <Route path="/create" exact component={Create} />
      <Route path="/login" exact component={Login} />
      <Route path="/chatchat" exact component={Test} />
    </div>
  );
}

export default App;
