import React from "react";
import "./App.css";
import { TopNavBar } from "./components/layout/TopNavBar";
import { Landing } from "./components/layout/Landing";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { NotFound } from "./components/layout/NotFound";
import { FooterBar } from "./components/layout/FooterBar";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Companies } from "./components/layout/Companies";
import { UserHome } from "./components/layout/userHome";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={"globalSettings"}>
          <TopNavBar />
          <div className={"mainContentArea"}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/companies" component={Companies} />
              <Route exact path="/userHome" component={UserHome} />
              <Route exact path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
          <FooterBar />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
