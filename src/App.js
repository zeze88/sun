import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../src/redux/configureStore";

import Main from "./page/Main";
import Login from "./page/Login";
import Create from "./page/Create";
import Detail from "./page/Detail";
import _Test from "./components/_Test";
import Ranking from "./page/Ranking";
import SearchResult from "./page/SearchResult";
import Header from "./components/Header";
import Category from "./components/Category";
import Edituser from "./page/Edituser";
import Password from "./page/Password";
import Footer from "./components/Footer";
import Arams from "./page/Arams";
import serch from "./redux/modules/serch";

function App() {
  const location = useLocation();
  return (
    <div className='App'>
      {location.pathname === "/login" ? null : <Header />}
      <Route path='/' exact component={Main} />
      <Route path='/create' exact component={Create} />
      <Route path='/edit/:pid' exact component={Create} />
      <Route path='/ranking' exact component={Ranking} />
      <Route path='/login' exact component={Login} />
      {/* <Route path='/chatchat1' exact component={_Test} /> */}
      <Route path='/detail/:pid' exact component={Detail} />
      <Route path='/search/:keyword' exact component={SearchResult} />
      <Route path='/useredit' exact component={Edituser} />
      <Route path='/passedit' exact component={Password} />
      <Route path='/arams' exact component={Arams} />
      <Footer />
    </div>
  );
}

export default App;
