import React from "react";
import { useSelector } from "react-redux";
import { Spinner, ListGroup, Button } from "reactstrap";
import { RootState } from "../../store";
import { ProfileState, Ride } from "../../store/profile";
import "../../css/userRides.css";
import { CompanyState } from "../../store/company";

/* The UpdateProfile page is where the user can update their profile
 * information.  If the user has just registered and does not yet have
 * profile information, they are first redirected to this page on login.
 */
export const UserRides: React.FC = () => {
  //redux state variables
  const { profile, loading } = useSelector<RootState, ProfileState>(
    state => state.profile
  );
  const { company } = useSelector<RootState, CompanyState>(
    state => state.company
  );

  const openRides = (ride: Ride) => {
    //next create the url to open on a new tab
    let url = `http://google.com/maps/dir/?api=1&origin=${ride.driver?.lat},${ride.driver?.long}&destination=${company.lat},${company.long}&waypoints=`;
    //loop through users to get their lat long for waypoints
    ride.riders.forEach(rider => {
          url += `${rider.lat},${rider.long}|`;
    });

    //remove last pipe
    url = url.slice(0, -1);

    window.open(url);
  }

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
                    <Button color="primary" onClick={() => openRides(ride)}>View Route</Button>
                  </div>
                )
            )}
        </ListGroup>
      </div>
    </>
  );
};
