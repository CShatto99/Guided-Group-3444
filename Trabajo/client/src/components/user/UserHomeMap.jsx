import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";
import "../../css/userHome.css";

export class UserHomeMap extends React.Component {
  render() {
    const { company } = this.props;

    return (
      company && (
        <Map
          google={this.props.google}
          zoom={12}
          initialCenter={{
            lat: company.lat,
            lng: company.long,
          }}
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
                    onClick={() => this.props.selectRider(user)}
                  />
                );
              })
            : null}
        </Map>
      )
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_SECRET,
})(UserHomeMap);
