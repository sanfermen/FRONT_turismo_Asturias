import { NavLink } from "react-router-dom";
import "./MapButton.css";

function MapButton () {
	return (
		<div className="mapButton">
			<button><NavLink to="/map" >IR AL MAPA</NavLink></button>
		</div>
	)
};

export default MapButton;