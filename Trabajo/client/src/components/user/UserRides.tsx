import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  Row,
} from "reactstrap";
import states from "../../json/states.json";
import { RootState } from "../../store";
import {
  ProfileState,
  Ride,
  Profile,
  updateProfile,
} from "../../store/profile";
import { UserState } from "../../store/user";
import { AlertState } from "../../store/alert";
import "../../css/updateProfile.css";

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UserRides: React.FC = () => {
  //redux state variables
  const dispatch = useDispatch();
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { user } = useSelector<RootState, UserState>(state => state.user);
  const { msg, status } = useSelector<RootState, AlertState>(
    state => state.alert
  );

  //state variables
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Profile | null>(null);
  const [selectedRiders, setSelectedRiders] = useState<Profile[]>([]);
  const [hasRides, setHasRides] = useState(false);

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
      setHasRides(true);
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
  }, [selectedDate]);

  //render the form
  return !hasRides ? (
    <div
      className={"formContainer"}
      style={{ width: "100%", maxWidth: "40rem" }}
    >
      <h1>You Are Currently In No Rides</h1>
    </div>
  ) : (
    <>
      <div
        className={"formContainer"}
        style={{ width: "100%", maxWidth: "36rem" }}
      >
        <h1>Your Rides</h1>
        <Form>
          <FormGroup>
            <Label for="date">Select a Date to View Your Ride Details</Label>
            <Input
              type="select"
              name="date"
              id="date"
              value={selectedDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedDate(e.target.value)
              }
            >
              {dates.map(value => {
                return <option key={value}>{value}</option>;
              })}
            </Input>
          </FormGroup>
        </Form>
        <h2 style={{ marginTop: "20px" }}>Ride Details</h2>
        <Row style={{ marginTop: "15px" }}>
          <Col md="4" style={{ textAlign: "right" }}>
            Date:
          </Col>
          <Col md="8">{selectedDate}</Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col md="4" style={{ textAlign: "right" }}>
            Driver:
          </Col>
          {selectedDriver && <Col md="8">{selectedDriver.name}</Col>}
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col md="12">Riders:</Col>
        </Row>
        {selectedRiders.map(rider => (
          <div key={rider._id}>{rider.name}</div>
        ))}
      </div>
    </>
  );
};
