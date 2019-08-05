import React from "react";
import { Marker } from "react-google-maps";
import LocationIcon from "@material-ui/icons/LocationOn";

export default class DoctorMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
          icon={LocationIcon}
        >
        </Marker>
    );
  }
}