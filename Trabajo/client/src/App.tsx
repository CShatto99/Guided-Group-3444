import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import { TopNavBar } from "./components/layout/TopNavBar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { NotFound } from "./components/layout/NotFound";
import { FooterBar } from "./components/layout/FooterBar";
import store from "./store";
import { CreateCompany } from "./components/company/createCompany";
import { UserHome } from "./components/user/userHome";
import { UpdateProfile } from "./components/user/updateProfile";
import { CreateRides } from "./components/layout/CreateRides"
import { ChangeCompanyCode } from "./components/company/changeCompanyCode";
import { UpdateUserCompany } from "./components/company/updateUserCompany";
import { refresh } from "./store/user";
import PrivateRoute from "./components/routing/PrivateRoute";
import { UserRides } from "./components/user/UserRides";

/*  The App() function sole purpose in our app is to provide the standard layout
 *  for our application and to provide routing to our different components.
 *
 *  Each <Route> below handles a different route for our web app.
 *
 *  Valid endpoints for users not authorized are:
 *    - /
 *    - /login
 *    - /register
 *
 *  Authorized users are valid for all of the endpoints.
 */

const App = () => {
  useEffect(() => {
    store.dispatch(refresh());
  }, []);

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
              <PrivateRoute exact path="/userHome" component={UserHome} />
              <PrivateRoute
                exact
                path="/userHome/updateProfile"
                component={UpdateProfile}
              />
              <PrivateRoute
                exact
                path="/userHome/createCompany"
                component={CreateCompany}
              />
              <PrivateRoute
                exact
                path="/userHome/admin/changeCompanyCode"
                component={ChangeCompanyCode}
              />
              <PrivateRoute
                exact
                path="/userHome/updateUserCompany"
                component={UpdateUserCompany}
              />
              <PrivateRoute
                exact
                path="/userHome/createRides"
                component={CreateRides}
              />
              <PrivateRoute 
                exact
                path="/userHome/rides"
                component={UserRides}
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
};

export default App;
