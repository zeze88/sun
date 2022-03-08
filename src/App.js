import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/configureStore";

import Main from "./page/Main";
import Post from "./page/Post";
import Login from "./page/Login";
import Create from "./page/Create";
import Test from "./page/Test";
import Detail from "./page/Detail";
import _Test from "./components/_Test";
import Ranking from "./page/Ranking";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main} />
      <Route path="/post" exact component={Post} />
      <Route path="/create" exact component={Create} />
      <Route path="/edit/:pid" exact component={Create} />
      <Route path="/createanswer" exact component={Create} />
      <Route path="/ranking" exact component={Ranking} />
      <Route path="/login" exact component={Login} />
      <Route path="/chatchat" exact component={Test} />
      <Route path="/chatchat1" exact component={_Test} />
      <Route path="/detail/:pid" exact component={Detail} />
    </div>
  );
}

export default App;
