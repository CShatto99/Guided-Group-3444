import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";

export const UserHome: React.FC = () => {
  const { isAuth, user, loading } = useSelector<RootState, UserState>(
    state => state.user
  );

  return !localStorage.getItem("isAuth") ? (
    <Redirect to="/login" />
  ) : (
    <h1>helo</h1>
  );
};
