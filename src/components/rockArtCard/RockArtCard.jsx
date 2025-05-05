import "./RockArtCard.css";

function RockArtCard({rockArt}) {
	const {
		name,
		image,
		period,
		information,
		web
	} = rockArt;

	return (
		<div className="rockArt_card">
			<img src={image} alt={name} />
			<h2>{name}</h2>
			<p><strong>Periodo:</strong> {period}</p>
			<p><strong>Información:</strong> {information}</p>
			{web && <p><strong>Web:</strong> <a href={web} target="_blank"> {web}</a></p>}
		</div>
	)
};

export default RockArtCard;