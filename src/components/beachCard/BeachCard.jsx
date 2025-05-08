import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFavourite } from "../../utils/hooks/useFavourite";

import "./BeachCard.css";

function BeachCard({ beach }) {
	const {
		name,
		image,
		information,
		services,
		beach_type
	} = beach;

	const { userData } = useContext(AuthContext);
	const { isFavourite, toggleFavourite } = useFavourite({
		userId: userData?.user_id,
		pointId: beach.beach_id,
		type: "beach"
	});

	return (
		<div className="beach_card">
			<img src={image} alt={image} />
			<h2>{name}</h2>
			<p><strong>Información:</strong> {information}</p>
			<p><strong>Servicios:</strong> {services}</p>
			<p><strong>Tipo de playa:</strong> {beach_type}</p>
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

export default BeachCard;