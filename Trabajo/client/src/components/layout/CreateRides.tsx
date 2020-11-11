import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Col, Form, Label, Input, Row, Spinner, FormGroup } from "reactstrap";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import { ProfileState, Profile } from "../../store/profile";
import { addResponseMessage, Widget, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "../../css/userHome.css";
import UserHomeMap from "../user/UserHomeMap";
import {
  CompanyState,
  getCompany,
  getCompanyMembers,
} from "../../store/company";
import { w3cwebsocket as WS } from "websocket";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const client = new WS("ws://localhost:8080");

/* UserHome is where the user will land once they are logged in and
 * have created a profile.  If the user is affiliated with a company,
 * then the company's users will be displayed on a map and the chat box
 * for that company will be rendered.
 */
export const CreateRides: React.FC = () => {
  const dispatch = useDispatch();
  //redux state variables
  const { isAuth, user } = useSelector<RootState, UserState>(
    state => state.user
  );
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { company, members } = useSelector<RootState, CompanyState>(
    state => state.company
  );

  //state variables
  const [redirect, setRedirect] = useState(false);
  const [launcher, setLauncher] = useState<HTMLButtonElement | null>(null);
  const [currentRiders, setCurrentRiders] = useState<string[]>([]);
  const [rideDate, setRideDate] = useState("");
  const [chooseType, setChooseType] = useState(true);
  const [numRiders, setNumRiders] = useState("");


  /* useEffect is called when the component loads or when any of the state
   * variables in the array included at the end of the function is updated.
   * We use it here to make sure the user has a profile, and if not they
   * are redirected to the updateProfile page.
   */
  useEffect(() => {
    if (!loading && !profile) {
      setRedirect(true);
    }

    if (profile && profile.companyID) {
      dispatch(getCompany(profile.company));
      dispatch(getCompanyMembers(profile.companyID));
      //this opens the websocket connection
      client.onopen = () => {
        console.log("WebSocket Client Connected");
      };
      //this handles messages received from the server for the chatbox
      client.onmessage = message => {
        //parse the message received
        const messageStr = String(message.data);
        console.log(messageStr);
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

    launcher && launcher.click();
  }, [loading]);

  useEffect(() => {
    profile &&
      company.messages &&
      company.messages.forEach(message => {
        const dividedMsg = message.split(":");
        console.log(dividedMsg[0], profile.name);
        if (dividedMsg[0] === profile.name) addUserMessage(dividedMsg[1]);
        else addResponseMessage(message);
      });
  }, [company]);

  useEffect(() => {
    //do nothing page reload
  }, [currentRiders]);

  //this function will send the messages to the back end
  const handleNewUserMessage = (newMessage: string) => {
    if (profile?.companyID != undefined) {
      const message = `${profile.companyID}:${profile.name}:${newMessage}`;
      client.send(message);
    }
  };

  const handleRider = (rider: string) => {
    setCurrentRiders(currentRiders.find(r => r === rider) ?
      currentRiders.filter(r => r !== rider) :
      currentRiders.concat(rider)
    )
  }

  const selectRiderMap = (rider: string) => {
    setCurrentRiders(currentRiders.find(r => r === rider) ?
      currentRiders.filter(r => r !== rider) :
      currentRiders.concat(rider)
    )
  }

  console.log(currentRiders);

  //if the user is authorized and logged in and has a profile then render the page
  return (
    <div className="home-container">
      {profile ? (
        <Row className="align-items-center">
          <Col xs={12} lg={6} className="map-container">
            <UserHomeMap users={members} selectRider={selectRiderMap}/>
          </Col>
          <Col xs={12} lg={6}>
            <Form>
              <FormGroup>
                <Label htmlFor="rideDate">Pick a Date</Label>
                <Input type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRideDate(e.target.value) }} />
              </FormGroup>

              <FormGroup>
                <Label>Choose Number of Riders</Label>
                <Input type="text" name="numRiders" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setNumRiders(e.target.value) }} />
              </FormGroup>

              <FormGroup tag="fieldset">
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" checked={chooseType} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setChooseType(true)
                    } />{' '}
                    Choose Manually
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setChooseType(false)} /> {' '}
                    Choose Automatically
                  </Label>
                </FormGroup>
              </FormGroup>

              <FormGroup>
                {chooseType && (<><Label htmlFor="riders">Choose Riders</Label>
                  <div style={{ color: '#fff' }}>
                    <div style={{ backgroundColor: '#2d545e' }} onClick={() => handleRider("bob")}>bob</div>
                    <div style={{ backgroundColor: '#2d545e' }} onClick={() => handleRider("bob 2")}>bob 2</div>
                    {members && members.map((member: Profile) =>
                      user._id !== member.userID && <div style={currentRiders.indexOf(member.name) ? { backgroundColor: '#2d545e' } : {backgroundColor: 'gray'}} onClick={() => handleRider(member.name)}>{member.name}</div>
                    )}</div>
                </>)}
              </FormGroup>
            </Form>
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
        )
      }
    </div >
  );
};

