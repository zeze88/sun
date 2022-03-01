import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/configureStore";

import Main from "./page/Main";
import Signup from './page/Signup';
import Login from "./page/Login"

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
