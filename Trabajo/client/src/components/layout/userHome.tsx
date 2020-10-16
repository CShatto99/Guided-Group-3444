import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { ProfileState } from "../../store/profile";

export const UserHome: React.FC = () => {
  const { isAuth, user } = useSelector<RootState, UserState>(
    state => state.user
  );

  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loading && JSON.stringify(profile) == "{}") {
      setRedirect(true);
    }
  }, [loading]);

  return !localStorage.getItem("isAuth") ? (
    <Redirect to="/login" />
  ) : redirect ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <h1>helo</h1>
  )
};
