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
import { CreateCompany } from "./components/layout/createCompany";
import { UserHome } from "./components/layout/userHome";
import { UpdateProfile } from "./components/layout/updateProfile";
import { ChangeCompanyCode } from "./components/layout/changeCompanyCode";

/*  The App() function sole purpose in our app is to provide the standard layout
 *  for our application and to provide routing to our different components
 *
 *  Valid endpoitns for users not authorized are:
 *    - /
 *    - /login
 *    - /register
 *
 *  Authorized users are valid for all of the endpoints.
 */

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
              <Route exact path="/userHome" component={UserHome} />
              <Route
                exact
                path="/userHome/updateProfile"
                component={UpdateProfile}
              />
              <Route
                exact
                path="/userHome/createCompany"
                component={CreateCompany}
              />
              <Route
                exact
                path="/userHome/admin/changeCompanyCode"
                component={ChangeCompanyCode}
              />
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
