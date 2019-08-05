import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import LocationIcon from "@material-ui/icons/LocationOn";

const DoctorsMap = withScriptjs(withGoogleMap((props) => {

  return (
    <GoogleMap
      defaultZoom={14}
      center={{ lat: 1.2941, lng: 103.7744 }}
    >
     <Marker position={{ lat: 1.2941, lng: 103.7744  }} icon={LocationIcon}> 
     </Marker> 
    </GoogleMap>
  );
}
))

export default DoctorsMap;