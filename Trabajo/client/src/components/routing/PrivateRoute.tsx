import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";

/* PrivateRoute checks to make sure that a user is logged in if they are
 * trying to access any of the private routes in the web app.  If the user
 * is not authorized, then it redirects them to the login page.
 */
const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  exact: boolean;
  path: string;
  component: any;
}) => {
  const { isAuth, loading } = useSelector<RootState, UserState>(
    state => state.user
  );
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
