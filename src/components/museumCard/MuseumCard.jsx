import "./MuseumCard.css";

function MuseumCard({museum}) {
	const {
		name,
		image,
		web,
		information,
		free
	} = museum;

	return (
		<div className="museum_card">
			<img
				src={image}
				alt={name}
			/>
			<h2>{name}</h2>
			<p><strong>Información:</strong> {information}</p>
			<p><strong>Precio:</strong> {free && "Gratuito" || "De pago"}</p>
			{web && <p><strong>Web:</strong> <a href={web} target="_blank"> {web}</a></p>}
		</div>
	)
}

export default MuseumCard;