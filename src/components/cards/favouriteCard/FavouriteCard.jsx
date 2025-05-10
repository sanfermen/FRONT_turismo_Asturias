import { useMapContext } from "../../../context/MapContext";
import { useNavigate } from "react-router-dom";
import "./FavouriteCard.css";

function FavouriteCard({ item, type }) {
	const { setTargetPoint } = useMapContext();
	const navigate = useNavigate();

	if(!item) return null;

	const name = item.name;
	const image = item.image;
	const id = item[`${type}_id`];

	const goToMap = () => {
		console.log("GO TO MAP:", { type, id });
		setTargetPoint({ type, id });
		navigate("/map");

		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: "smooth"});
		}, 100);
	}

	return (
		<div className="favouriteCard">
			{image && <img src={image} alt={name} className="miniatura" />}
			<div className="favouriteInfo">
				<h3>{name}</h3>
			</div>
			<button onClick={goToMap}>Ver en el mapa</button>
		</div>
	);
}

export default FavouriteCard;