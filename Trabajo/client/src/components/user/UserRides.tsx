import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { RootState } from "../../store";
import { ProfileState, Ride, Profile } from "../../store/profile";

import "../../css/userRides.css";
import { parseCommandLine, parseConfigFileTextToJson } from "typescript";

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UserRides: React.FC = () => {
  //redux state variables
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );

  //state variables
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Profile | null>(null);
  const [selectedRiders, setSelectedRiders] = useState<Profile[]>([]);

  useEffect(() => {
    //fill page with rides
    if (!loading && profile && profile.rides.length > 0) {
      const loadDates: string[] = [];
      profile.rides.forEach((ride: Ride) => {
        loadDates.push(ride.dateOfRide);
      });
      setDates(profile.rides.map(ride => ride.dateOfRide));
      setSelectedDate(profile.rides[0].dateOfRide);
      setSelectedDriver(profile.rides[0].driver);
      setSelectedRiders(profile.rides[0].riders);
    }
  }, [loading, profile]);

  useEffect(() => {
    if (profile) {
      if (profile.rides) {
        profile.rides.forEach((ride: Ride) => {
          if (selectedDate === ride.dateOfRide) {
            setSelectedDriver(ride.driver);
            setSelectedRiders(ride.riders);
          }
        });
      }
    }
  }, [selectedDate, profile]);

  //render the form

  profile && console.log(profile.rides);

  return loading ? (
    <Spinner />
  ) : profile && profile.rides.length < 0 ? (
    <div className="formContainer" style={{ width: "100%", maxWidth: "40rem" }}>
      <h1>You Are Currently In No Rides</h1>
    </div>
  ) : (
    <>
      <div className="rides-container">
        <h1 style={{ marginBottom: "2rem" }}>Your Rides</h1>
        <ListGroup>
          {profile &&
            profile.rides.map(
              ride =>
                ride.driver && (
                  <div className="ride-details">
                    <h2>Ride Details</h2>
                    <h5>
                      Scheduled for {ride.dateOfRide} with driver{" "}
                      {ride.driver.name}
                    </h5>
                    <hr />
                    <h5>Riders</h5>
                    <div className="rider-list">
                      {ride.riders.map(rider => (
                        <p>{rider.name}</p>
                      ))}
                    </div>
                  </div>
                )
            )}
        </ListGroup>
      </div>
    </>
  );
};
