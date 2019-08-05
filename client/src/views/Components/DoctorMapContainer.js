import React from "react";
import DoctorsMap from "./DoctorsMap";

export default class DoctorsMapContainer extends React.Component {

	render() {
		return (
			<DoctorsMap
				// doctors={this.props.doctors}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCeR8OR0hKvhOQWkTt2ttwrnOXqoin0gwg&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px`, width: `1090px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}