import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Form,
  Label,
  Input,
  Row,
  Spinner,
  FormGroup,
} from "reactstrap";
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
import "../../css/createRides.css";
import { current } from "@reduxjs/toolkit";

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
  const [launcher, setLauncher] = useState<HTMLButtonElement | null>(null);
  const [currentRiders, setCurrentRiders] = useState<string[]>([]);
  const [rideDate, setRideDate] = useState("");
  const [chooseType, setChooseType] = useState(true);
  const [numRiders, setNumRiders] = useState("1");
  const [availableRiders, setAvailableRiders] = useState<Profile[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

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

  //this useEffect will update the users based off the weekday selected by user
  useEffect(() => {
    let newRiders: Profile[] = [];

    const weekday = new Date(rideDate).getDay();
    //weekdays: 0 monday, 1 tuesday, 2 wednesday, 3 thursday, 4 friday, 5 saturday, 6 sunday

    members?.forEach((member: Profile) => {
      //first check to make sure userID doesnt match
      if (member.userID !== user._id) {
        //next check they need rides for the weekday selected
        if (member.rideDays[weekday] === "1") {
          //next check to make sure they aren't already in a ride for the day selected
          let alreadyRiding: boolean = false;
          member.rides?.forEach(ride => {
            ride.dateOfRide === rideDate
              ? (alreadyRiding = true)
              : (alreadyRiding = false);
          });

          //if all checks passed, add user to newriders array
          if (!alreadyRiding) {
            newRiders.push(member);
          }
        }
      }
    });

    //reset riders user may have already selected since new date has been selected
    setCurrentRiders([]);
    setAvailableRiders(newRiders);
  }, [rideDate]);

  //this use effect is called when 'automatically' is chosen
  useEffect(() => {
    if (!chooseType) {
      autoPopulate();
    }
  }, [chooseType]);

  //this function will send the messages to the back end
  const handleNewUserMessage = (newMessage: string) => {
    if (profile?.companyID != undefined) {
      const message = `${profile.companyID}:${profile.name}:${newMessage}`;
      client.send(message);
    }
  };

  const handleRider = (rider: string) => {
    if (currentRiders.length < parseInt(numRiders)) {
      setCurrentRiders(
        currentRiders.find(r => r === rider)
          ? currentRiders.filter(r => r !== rider)
          : currentRiders.concat(rider)
      );
    } else {
      if (currentRiders.indexOf(rider)) {
        setCurrentRiders(currentRiders.filter(r => r !== rider));
      }
    }
  };

  const selectRiderMap = (rider: string) => {
    handleRider(rider);
  };

  //This function will automatically select riders until the number of riders chosen
  //is equal to the number of desired riders
  const autoPopulate = () => {
    let numCurrentRiders = currentRiders.length;
    let numMaxRiders = parseInt(numRiders);
    let newRiders = currentRiders;

    if (numMaxRiders !== NaN) {
      while (numCurrentRiders < numMaxRiders) {
        //var to hold min distance found and rider profile
        var foundUser: Profile | null = profile;
        var minDistance = Number.MAX_VALUE;

        //get closest rider
        availableRiders.forEach((rider: Profile) => {
          //first check if rider is not current user
          if (rider.userID !== user._id) {
            //next check to make sure user is not already in currentRiders
            if (newRiders.indexOf(rider.name) === -1) {
              //then find distance to user
              const x = (profile?.lat || 0) - rider.lat;
              const y = (profile?.long || 0) - rider.long;
              const currentDistance = Math.sqrt(
                Math.pow(x, 2) + Math.pow(y, 2)
              );

              //if this is the closest user so far, update found var's
              if (currentDistance < minDistance) {
                minDistance = currentDistance;
                foundUser = rider;
              }
            }
          }
        });

        //if a user was found update current users
        if (foundUser && profile) {
          if (foundUser.userID !== profile.userID) {
            newRiders.push(foundUser.name);
          }
        }
        numCurrentRiders++;
      }
    }
    //set new currentRiders
    setCurrentRiders(newRiders);
    setForceUpdate(forceUpdate + 1);
  };

  //if the user is authorized and logged in and has a profile then render the page
  return (
    <div className="home-container">
      {profile ? (
        <Row className="align-items-center">
          <Col xs={12} lg={6} className="map-container">
            <UserHomeMap users={availableRiders} selectRider={selectRiderMap} />
          </Col>
          <Col xs={12} lg={6}>
            <Form>
              <FormGroup>
                <Label htmlFor="rideDate">Pick a Date</Label>
                <Input
                  type="date"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setRideDate(e.target.value);
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label>Choose Number of Riders</Label>
                <Input
                  type="text"
                  name="numRiders"
                  value={numRiders}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNumRiders(e.target.value);
                  }}
                />
              </FormGroup>
              <p className="cr-btn-p">
                Choose riders by clicking their map markers or click the 'Find
                Riders' button to automatically find available riders.
              </p>
              <FormGroup className="cr-buttons">
                <Button
                  type="button"
                  className="cr-btn"
                  onClick={() => autoPopulate()}
                  disabled={!rideDate}
                >
                  {" "}
                  Find Riders
                </Button>
                <Button
                  type="button"
                  className="cr-btn-dgr"
                  onClick={() => setCurrentRiders([])}
                >
                  Remove All Riders
                </Button>
              </FormGroup>

              <FormGroup>
                {currentRiders.length > 0 ? (
                  <div>
                    <h4>Current Riders:</h4>
                    {currentRiders.map((member: string) => (
                      <div key={member} className="rider-div">
                        {member}
                      </div>
                    ))}
                  </div>
                ) : (
                  <h4>No riders selected</h4>
                )}
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
      )}
    </div>
  );
};
