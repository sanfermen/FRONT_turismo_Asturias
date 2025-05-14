import "./VisitedCard.css";

function VisitedCard({ item }) {
	if (!item) {
		return null;
	};

	const name = item.name;
	const image = item.image;

	return (
		<div className="visitedCard">
			{image && <img src={image} alt={name} className="miniatura" />}
			<h3>{name}</h3>
		</div>
	);
}

export default VisitedCard;