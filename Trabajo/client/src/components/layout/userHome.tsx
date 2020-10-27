import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Col, Form, Input, Row, Spinner } from "reactstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { ProfileState } from "../../store/profile";
import { addResponseMessage, Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "../../css/userHome.css";
import UserHomeMap from "./UserHomeMap";

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
  const [launcher, setLauncher] = useState<HTMLButtonElement | null>(null);

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

    launcher && launcher.click();
  }, [loading]);

  //this function will send the messages to the back end
  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming ${newMessage}`);
  };

  console.log(profile);

  //if the user is authorized and logged in and has a profile then render the page
  return !isAuth ? (
    <Redirect to="/login" />
  ) : redirect ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <div className="home-container">
      {profile ? (
        <Row className="align-items-center">
          <Col xs={12} md={6} className="map-container">
            <UserHomeMap />
          </Col>
          <Col xs={12} md={6} className="justify-content-center mt-4">
            <Widget
              handleNewUserMessage={handleNewUserMessage}
              title={profile.company}
              subtitle="Say hi to your co-workers!"
              launcher={(handleToggle: any) => (
                <button
                  style={{ display: "none" }}
                  ref={button => setLauncher(button)}
                  onClick={() => {
                    handleToggle();

                    addResponseMessage("Welcome to the chat!");
                  }}
                ></button>
              )}
            />
          </Col>
        </Row>
      ) : (
        <div className={"userHomeMap"}>
          <h2>You Have Not Selected a Company</h2>
          <h3>Click the Link Below to Select Your Company</h3>
          <Button href="/userHome/updateUserCompany" className={"submitButton"}>
            Select Company
          </Button>
        </div>
      )}
    </div>
  );
};
