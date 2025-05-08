import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFavourite } from "../../utils/hooks/useFavourite";
import DirectionsButton from "../DirectionsButton/DirectionsButton";

import "./MuseumCard.css";

function MuseumCard({museum}) {
	const {
		name,
		image,
		latitude,
		longitude,
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
			{web && <p> <a href={web} className="webLink" target="_blank"><strong>Saber más</strong></a></p>}
			<DirectionsButton latitude={latitude} longitude={longitude} />
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