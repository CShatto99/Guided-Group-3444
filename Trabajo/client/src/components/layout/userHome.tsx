import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Input, Row, Spinner } from "reactstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { ProfileState } from "../../store/profile";

/* UserHome is where the user will land once they are logged in and
 * have created a profile.  If the user is affiliated with a company,
 * then the company's users will be displayed on a map and the chat box
 * for that company will be rendered.
 */
export const UserHome: React.FC = () => {
  //redux state variables
  const { isAuth, user } = useSelector<RootState, UserState>(
    state => state.user
  );
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );

  //state variables
  const [redirect, setRedirect] = useState(false);

  /* useEffect is called when the component loads or when any of the state
   * variables in the array included at the end of the function is updated.
   * We use it here to make sure the user has a profile, and if not they
   * are redirected to the updateProfile page.
   */
  useEffect(() => {
    if (!loading && !profile) {
      console.log("setting redirect");
      setRedirect(true);
    }
  }, [loading]);

  //this will return the company user map to be rendered if the user has
  //selected a company.
  const companyDiv = () => {
    return (
      <div className={"userHomeMap"}>
        <h4>{profile && profile.companyCode}</h4>
        <div>map map REPLACE ME WITH GOOGLE MAP map map</div>
      </div>
    );
  };

  //if the user is authorized and logged in and has a profile then render the page
  return !localStorage.getItem("isAuth") ? (
    <Redirect to="/login" />
  ) : redirect ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <div className={"userHomeContainer"}>
      {profile && profile.companyCode ? (
        companyDiv
      ) : (
        <div className={"userHomeMap"}>
          <h2>You Have Not Selected a Company</h2>
          <h3>Click the Link Below to Select Your Company</h3>
          <Button href="/userHome/updateUserCompany" className={"submitButton"}>
            Select Company
          </Button>
        </div>
      )}
      <div className={"userHomeChat"}>
        <div className={"chatBox"}>
          <p>person: message</p>
          <p>person: message</p>
          <p>person: message</p>
        </div>
        <Form>
          <Row>
            <Input type="text" />
            <Button type="submit" size="sm">
              Send
            </Button>
          </Row>
        </Form>
        <Button href="/userHome/newRide">Make a New Ride</Button>
      </div>
    </div>
  );
};
