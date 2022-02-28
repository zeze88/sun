import React from "react";
import { Route } from "react-router-dom";

import Main from "./page/Main";
import Signup from './page/Signup';

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/signup" exact component={Signup} />
    </div>
  );
}

export default App;
