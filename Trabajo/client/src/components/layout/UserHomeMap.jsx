import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";

export class UserHomeMap extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
        initialCenter={{ lat: 33.254311, lng: -97.151867 }}
      >
        {this.props.users
          ? this.props.users.map((user, index) => {
              return (
                <Marker
                  key={index}
                  id={index}
                  position={{ lat: user.lat, lng: user.long }}
                  label={user.name}
                />
              );
            })
          : null}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_SECRET,
})(UserHomeMap);
