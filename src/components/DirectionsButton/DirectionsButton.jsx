import "./DirectionsButton.css"

const DirectionsButton = ({latitude, longitude}) => {
	const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

	return (
		<a href={googleMapsURL} target="blank" rel="noopener noreferrer" className="directionsButton">
			<span>Cómo llegar</span>
		</a>
	);
};

export default DirectionsButton;