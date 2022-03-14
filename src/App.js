import React from "react";
import { Route, useLocation } from "react-router-dom";
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
import SearchResult from "./page/SearchResult";
import Header from "./components/Header";

function App() {
  const login = useLocation();
  return (
    <div className='App'>
      {login.pathname === "/login" ? null : <Header />}
      <Route path='/' exact component={Main} />
      <Route path='/post' exact component={Post} />
      <Route path='/create' exact component={Create} />
      <Route path='/edit/:pid' exact component={Create} />
      <Route path='/createanswer' exact component={Create} />
      <Route path='/ranking' exact component={Ranking} />
      <Route path='/login' exact component={Login} />
      <Route path='/chatchat' exact component={Test} />
      <Route path='/chatchat1' exact component={_Test} />
      <Route path='/detail/:pid' exact component={Detail} />
      <Route path='/search/:keyword' exact component={SearchResult} />
    </div>
  );
}

export default App;
