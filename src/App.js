import React from "react";
import { Route } from "react-router-dom";

import Main from "./page/Main";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <Main />
      </Route>
    </div>
  );
}

export default App;
