import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFavourite } from "../../utils/hooks/useFavourite";

import "./MuseumCard.css";

function MuseumCard({museum}) {
	const {
		name,
		image,
		web,
		information,
		free
	} = museum;

	const { userData } = useContext(AuthContext);
	const { isFavourite, toggleFavourite } = useFavourite({
		userId: userData?.user_id,
		pointId: museum.museum_id,
		type: "museum"
	}) 

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
			{userData &&
				<>
				<div className="favButton">
					<button onClick={toggleFavourite}>
						{isFavourite ? "Quitar de favoritos" : "Añadir a favoritos"}
					</button>
				</div>
				<div className="visitButton">
					<button>Visitado</button>
				</div>
				</>
				}
		</div>
	);
}

export default MuseumCard;