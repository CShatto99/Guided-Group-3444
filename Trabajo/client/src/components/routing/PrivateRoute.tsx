import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  exact: boolean;
  path: string;
  component: any;
}) => {
  const { isAuth } = useSelector<RootState, UserState>(state => state.user);
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("isAuth") !== "true" ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
