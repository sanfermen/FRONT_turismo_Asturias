import "./BeachCard.css";

function BeachCard({ beach }) {
	const {
		name,
		image,
		information,
		services,
		beach_type
	} = beach;

	return (
		<div className="beach_card">
			<img
				src={image}
				alt={image}
			/>
		<h2>{name}</h2>
		<p><strong>Información:</strong> {information}</p>
		<p><strong>Servicios:</strong> {services}</p>
		<p><strong>Tipo de playa:</strong> {beach_type}</p>
		</div>
	);
}

export default BeachCard;