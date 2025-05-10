import "./FavouriteCard.css";

function FavouriteCard({ item }) {

	if(!item) return null;

	const name = item.name;
	const image = item.image;

	return (
		<div className="favouriteCard">
			{image && <img src={image} alt={name} className="miniatura" />}
			<div className="favouriteInfo">
				<h3>{name}</h3>
			</div>
		</div>
	);
}

export default FavouriteCard;