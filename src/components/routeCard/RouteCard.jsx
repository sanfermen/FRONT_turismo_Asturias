import "./RouteCard.css";

function RouteCard({route}) {
	const {
		name,
		image,
		type,
		information,
		web,
		distance,
		time,
		origin_destination
	} = route;

	return (
		<div className="route_card">
			<img src={image} alt={name} />
			<h2>{name}</h2>
			<p><strong>Tipo de ruta:</strong> {type}</p>
			<p><strong>Información:</strong> {information}</p>
			{web && <p><strong>Web:</strong> <a href={web} target="_blank"> {web}</a></p>}
			<p><strong>Distancia: </strong> {distance} km.</p>
			{time && <p><strong>Duración:</strong> {time}</p>}
			{origin_destination && <p><strong>Origen-Destino:</strong> {origin_destination}</p>}
		</div>
	)
};

export default RouteCard;