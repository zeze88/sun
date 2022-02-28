import React from "react";
import { Route } from "react-router-dom";

import Main from "./page/Main";
import Signup from "./page/Signup";
import Post from "./page/Post";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Main} />
      <Route path="/post" exact component={Post} />
      <Route path="/signup" exact component={Signup} />
    </div>
  );
}

export default App;
