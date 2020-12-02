import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Form,
  Label,
  Input,
  Row,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { addResponseMessage, addUserMessage } from "react-chat-widget";
import { w3cwebsocket as WS } from "websocket";
import { RootState } from "../../store/index";
import { UserState } from "../../store/user";
import {
  ProfileState,
  Profile,
  Ride,
  createCompanyRide,
} from "../../store/profile";
import UserHomeMap from "../user/UserHomeMap";
import {
  CompanyState,
  getCompany,
  getCompanyMembers,
} from "../../store/company";
import "react-chat-widget/lib/styles.css";
import "../../css/userHome.css";
import "../../css/createRides.css";

let HOST = window.location.origin.replace(/^http/, "ws");
if (HOST.search("3000") === -1) {
  HOST += ":8080";
} else {
  HOST = HOST.replace("3000", "8080");
}
const client = new WS(HOST);

/* UserHome is where the user will land once they are logged in and
 * have created a profile.  If the user is affiliated with a company,
 * then the company's users will be displayed on a map and the chat box
 * for that company will be rendered.
 */
export const CreateRides: React.FC = () => {
  const dispatch = useDispatch();
  //redux state variables
  const { user } = useSelector<RootState, UserState>(state => state.user);
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { company, members } = useSelector<RootState, CompanyState>(
    state => state.company
  );

  //state variables
  const [currentRiders, setCurrentRiders] = useState<Profile[]>([]);
  const [rideDate, setRideDate] = useState("");
  const [numRiders, setNumRiders] = useState("1");
  const [availableRiders, setAvailableRiders] = useState<Profile[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [modal, setModal] = useState(false);
  const [redirectToRides, setRedirectToRides] = useState(false);

  /* useEffect is called when the component loads or when any of the state
   * variables in the array included at the end of the function is updated.
   * We use it here to make sure the user has a profile, and if not they
   * are redirected to the updateProfile page.
   */
  useEffect(() => {
    if (profile && profile.companyID) {
      dispatch(getCompany(profile.company));
      dispatch(getCompanyMembers(profile.companyID));
    }
  }, [loading, profile, dispatch]);

  useEffect(() => {
    profile &&
      company.messages &&
      company.messages.forEach(message => {
        const dividedMsg = message.split(":");

        if (dividedMsg[0] === profile.name) addUserMessage(dividedMsg[1]);
        else addResponseMessage(message);
      });
  }, [company, profile]);

  //this useEffect will update the users based off the weekday selected by user
  useEffect(() => {
    //first check if this user is already in a ride that day
    let userInRide = false;
    if (profile && profile.rides) {
      profile.rides.forEach((ride: Ride) => {
        if (ride.dateOfRide === rideDate) {
          userInRide = true;
        }
      });
    }

    //only do the following code if user is not in ride for the day selected
    if (!userInRide) {
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
            member.rides?.forEach((ride: Ride) => {
              if (ride.dateOfRide === rideDate) {
                alreadyRiding = true;
              }
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
    } else {
      alert("You are already in a ride that day!");
      setCurrentRiders([]);
      setAvailableRiders([]);
    }
  }, [rideDate, members, user._id]);

  const selectRiderMap = (rider: Profile) => {
    if (currentRiders.length < parseInt(numRiders)) {
      setCurrentRiders(
        currentRiders.find(r => r.name === rider.name)
          ? currentRiders.filter(r => r.name !== rider.name)
          : currentRiders.concat(rider)
      );
    } else {
      if (currentRiders.indexOf(rider)) {
        setCurrentRiders(currentRiders.filter(r => r.name !== rider.name));
      }
    }
  };

  //This function will automatically select riders until the number of riders chosen
  //is equal to the number of desired riders
  const autoPopulate = () => {
    let numCurrentRiders = currentRiders.length;
    let numMaxRiders = parseInt(numRiders);
    let newRiders = currentRiders;

    if (!isNaN(numMaxRiders)) {
      while (numCurrentRiders < numMaxRiders) {
        //var to hold min distance found and rider profile
        let foundUser: Profile | null = profile;
        let minDistance = Number.MAX_VALUE;

        //get closest rider
        availableRiders.forEach((rider: Profile) => {
          //first check if rider is not current user
          if (rider.userID !== user._id) {
            //next check to make sure user is not already in currentRiders
            if (newRiders.indexOf(rider) === -1) {
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
            newRiders.push(foundUser);
          }
        }
        numCurrentRiders++;
      }
    }
    //set new currentRiders
    setCurrentRiders(newRiders);
    setForceUpdate(forceUpdate + 1);
  };

  const toggle = () => setModal(!modal);

  const createRide = () => {
    setModal(!modal);

    //new ride object
    const newRide = {
      dateOfRide: rideDate,
      driver: profile,
      riders: currentRiders,
    };

    //call redux to send this to the api and save to the database and save to current user profile
    dispatch(createCompanyRide(newRide));

    //next create the url to open on a new tab
    let url = `http://google.com/maps/dir/?api=1&origin=${profile?.lat},${profile?.long}&destination=${company.lat},${company.long}&waypoints=`;
    //loop through users to get their lat long for waypoints
    currentRiders.forEach(rider => {
      members?.forEach(member => {
        if (rider.name === member.name) {
          url += `${member.lat},${member.long}|`;
        }
      });
    });

    //remove last pipe
    url = url.slice(0, -1);

    window.open(url);

    let newMessage = `I just made a ride for **${rideDate}** with riders `;
    if (currentRiders.length === 1) {
      newMessage += "**" + currentRiders[0].name + "**";
    } else {
      for (var i = 0; i < currentRiders.length; i++) {
        if (i !== currentRiders.length - 1) {
          newMessage += "**" + currentRiders[i].name + "**, ";
        } else {
          newMessage += "and **" + currentRiders[i].name + "**!";
        }
      }
    }

    if (profile) {
      const message = `${profile.companyID}:${profile.name}:${newMessage}`;
      client.send(message);
    }

    setRedirectToRides(true);
  };

  const getModal = () => {
    if (currentRiders.length > 0) {
      return (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div>Create the following ride:</div>
            <div>{`Date: ${rideDate}`}</div>
            <div>{`Driver: ${user.fullName}`}</div>
            <div>Riders:</div>
            {currentRiders.map((rider: Profile) => {
              return (
                <div key={rider.userID} style={{ marginLeft: "20px" }}>
                  {rider.name}
                </div>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button className="btn-confirm" onClick={createRide}>
              Confirm
            </Button>{" "}
            <Button className="btn-cancel" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      );
    } else {
      return (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Unable to Create Ride</ModalHeader>
          <ModalBody>
            <div>You have no riders selected!</div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-cancel" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  };

  //if the user is authorized and logged in and has a profile then render the page
  return redirectToRides ? (
    <Redirect to="/userHome/rides" />
  ) : (
    <>
      <div>{getModal()}</div>
      <div className="crt-rides-container">
        {profile ? (
          <Row className="align-items-center">
            <Col xs={12} lg={6} className="map-container">
              {JSON.stringify(company) !== "{}" && (
                <UserHomeMap
                  company={company}
                  users={availableRiders}
                  selectRider={selectRiderMap}
                />
              )}
            </Col>
            <Col xs={12} lg={6} className="crt-form-container">
              <Form>
                <FormGroup>
                  <Label htmlFor="rideDate">First Pick a Date</Label>
                  <Input
                    type="date"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setRideDate(e.target.value);
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Next Choose Number of Riders</Label>
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
                  Finally choose riders by clicking their map markers or click
                  the 'Find Riders' button to automatically find available
                  riders.
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
                      {currentRiders.map((member: Profile) => (
                        <div key={member.name} className="rider-div">
                          {member.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h4>No riders selected</h4>
                  )}
                </FormGroup>
                <FormGroup>
                  <Button onClick={toggle}>Submit Ride</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        ) : (
          <div className={"userHomeMap"}>
            <h2>You Have Not Selected a Company</h2>
            <h3>Click the Link Below to Select Your Company</h3>
            <Button
              href="/userHome/updateUserCompany"
              className={"submitButton"}
            >
              Select Company
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
