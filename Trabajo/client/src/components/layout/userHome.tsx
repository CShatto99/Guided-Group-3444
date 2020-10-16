import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Input, Row, Spinner } from "reactstrap";
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
    if (!loading && !profile) {
      console.log("setting redirect");
      setRedirect(true);
    }
  }, [loading]);

  return !localStorage.getItem("isAuth") ? (
    <Redirect to="/login" />
  ) : redirect ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <div className={"userHomeContainer"}>
      <div className={"userHomeMap"}>
        <h4>company name</h4>
        <div>map map map</div>
      </div>
      <div className={"userHomeChat"}>
        <div className={"chatBox"}>
          <p>person: message</p>
          <p>person: message</p>
          <p>person: message</p>
        </div>
        <Form>
          <Row>
            <Input type="text"/>
            <Button type="submit" size="sm">Send</Button>
          </Row>
        </Form>
        <Button href="/userHome/newRide">Make a New Ride</Button>
      </div>
    </div>
  )
};
