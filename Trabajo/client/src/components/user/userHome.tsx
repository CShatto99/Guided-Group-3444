import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row, Spinner } from "reactstrap";
import { RootState } from "../../store/index";
import { ProfileState } from "../../store/profile";
import { addResponseMessage, Widget, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "../../css/userHome.css";
import UserHomeMap from "./UserHomeMap";
import {
  CompanyState,
  getCompany,
  getCompanyMembers,
} from "../../store/company";
import { w3cwebsocket as WS } from "websocket";

let HOST = window.location.origin.replace(/^http/, "ws");
if (HOST.search("3000") === -1) {
  HOST += ":8080/ws";
} else {
  HOST = HOST.replace("3000", "8080/ws");
}
const client = new WS(HOST);

/* UserHome is where the user will land once they are logged in and
 * have created a profile.  If the user is affiliated with a company,
 * then the company's users will be displayed on a map and the chat box
 * for that company will be rendered.
 */
export const UserHome: React.FC = () => {
  const dispatch = useDispatch();
  //redux state variables
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { company, members } = useSelector<RootState, CompanyState>(
    state => state.company
  );

  //state variables
  const [launcher, setLauncher] = useState<HTMLButtonElement | null>(null);

  /* useEffect is called when the component loads or when any of the state
   * variables in the array included at the end of the function is updated.
   * We use it here to make sure the user has a profile, and if not they
   * are redirected to the updateProfile page.
   */
  useEffect(() => {
    if (profile && profile.companyID) {
      dispatch(getCompany(profile.company));
      dispatch(getCompanyMembers(profile.companyID));
      //this opens the websocket connection
      client.onopen = () => {};
      //this handles messages received from the server for the chatbox
      client.onmessage = message => {
        //parse the message received
        const messageStr = String(message.data);
        const dividedMsg = messageStr.split(":");
        //if the company id's match
        if (dividedMsg[0] === profile.companyID) {
          //if the name is not the same as the current user (meaning if this user didn't send this message)
          if (dividedMsg[1] !== profile.name) {
            //show who sent the message and their message
            addResponseMessage(`${dividedMsg[1]}: ${dividedMsg[2]}`);
          }
        }
      };
    }
  }, [loading, dispatch, profile]);

  useEffect(() => {
    launcher && launcher.click();
  }, [launcher]);

  useEffect(() => {
    profile &&
      company.messages &&
      company.messages.forEach(message => {
        const dividedMsg = message.split(":");
        if (dividedMsg[0] === profile.name) addUserMessage(dividedMsg[1]);
        else addResponseMessage(message);
      });
  }, [company, profile]);

  //this function will send the messages to the back end
  const handleNewUserMessage = (newMessage: string) => {
    if (profile?.companyID !== undefined) {
      const message = `${profile.companyID}:${profile.name}:${newMessage}`;
      client.send(message);
    }
  };

  //if the user is authorized and logged in and has a profile then render the page
  return loading ? (
    <Spinner />
  ) : !loading && !profile ? (
    <Redirect to="/userHome/updateProfile" />
  ) : (
    <div className="home-container">
      {profile ? (
        <>
          <Row className="align-items-center">
            <Col xs={12} lg={6} className="map-container">
              <UserHomeMap company={company} users={members} />
            </Col>
            <Col xs={12} lg={6} className="chat-container">
              <Widget
                handleNewUserMessage={handleNewUserMessage}
                title={profile.company}
                subtitle={
                  <Button className="crt-rides" href="/userHome/createRides">
                    Create Rides
                  </Button>
                }
                showTimeStamp={false}
                launcher={(handleToggle: any) => (
                  <button
                    style={{ display: "none" }}
                    ref={button => setLauncher(button)}
                    onClick={() => {
                      handleToggle();
                    }}
                  ></button>
                )}
              />
            </Col>
          </Row>
        </>
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
