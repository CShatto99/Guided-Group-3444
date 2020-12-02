import React from "react";
import { useSelector } from "react-redux";
import { Spinner, ListGroup } from "reactstrap";
import { RootState } from "../../store";
import { ProfileState } from "../../store/profile";
import "../../css/userRides.css";

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UserRides: React.FC = () => {
  //redux state variables
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );

  //render the form

  return loading ? (
    <div className="spinner-wrapper">
      <Spinner />
    </div>
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
                        <p key={rider.email}>{rider.name}</p>
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
