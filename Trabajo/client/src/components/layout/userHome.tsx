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

  const companyDiv = () => {
    return (
      <div className={"userHomeMap"}>
        <h4>{profile.companyID}</h4>
        <div>map map REPLACE ME WITH GOOGLE MAP map map</div>
      </div>
    )
  };

  return !localStorage.getItem("isAuth") ? (
    <Redirect to="/login" />
  ) : redirect ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <div className={"userHomeContainer"}>
      {profile.companyID ? companyDiv : 
      <div className={"userHomeMap"}>
        <h2>You Have Not Selected a Company</h2>
        <h3>Click the Link Below to Select Your Company</h3>
        <Button href="/userHome/updateUserCompany" className={"submitButton"}>Select Company</Button>
      </div>}
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
