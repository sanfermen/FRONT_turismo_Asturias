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
			<div className="visitedInfo">
				<h3>{name}</h3>
			</div>
		</div>
	);
}

export default VisitedCard;