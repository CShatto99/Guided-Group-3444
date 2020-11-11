import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";
import "../../css/userHome.css";

export class UserHomeMap extends React.Component {

  constructor(props) {
    super(props);
  }

  onMarkerClick = (props, marker, e) => {
    this.props.selectRider && this.props.selectRider(marker.name);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        initialCenter={{ lat: 33.254311, lng: -97.151867 }}
        className="g-map-style"
      >
        {this.props.users
          ? this.props.users.map((user, index) => {
              return (
                <Marker
                  key={index}
                  id={index}
                  title={user.name}
                  name={user.name}
                  position={{ lat: user.lat, lng: user.long }}
                  label={user.name}
                  onClick={this.onMarkerClick}
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
