import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { ProfileState } from "../../store/profile";

export const UserHome: React.FC = () => {
  const { isAuth, user, loading } = useSelector<RootState, UserState>(
    state => state.user
  );
  const { profile } = useSelector<RootState, ProfileState>( state => state.profile);

  return !localStorage.getItem("isAuth") ? (
    <Redirect to="/login" />
  ) : JSON.stringify(profile) === "{}" ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <h1>helo</h1>
  )
};
