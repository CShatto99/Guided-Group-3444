import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";
import { getEffectiveConstraintOfTypeParameter } from "typescript";
import "../../css/userHome.css";

export class UserHomeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center:{lat: 33.254311, lng: -97.151867 }
    }
  }
/*
  getCenter = () => {
    if(this.props.company) {
      this.setState({center: {lat: this.props.company.lat, lng: this.props.company.long}});
    }
  }
*/
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        //initialCenter={getCenter()}
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_SECRET,
})(UserHomeMap);
