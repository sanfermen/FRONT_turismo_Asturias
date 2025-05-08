import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFavourite } from "../../utils/hooks/useFavourite";
import DirectionsButton from "../DirectionsButton/DirectionsButton";

import "./PreromanCard.css";

function PreromanCard({ preroman }) {
	const {
		name,
		image,
		latitude,
		longitude,
		unesco_heritage,
		information,
		web
	} = preroman;

	const { userData } = useContext(AuthContext);
	const { isFavourite, toggleFavourite } = useFavourite({
		userId: userData?.user_id,
		pointId: preroman.preroman_id,
		type: "preroman"
	});

	return (
		<div className="preroman_card">
			<img src={image} alt={name} />
			<h2>{name}</h2>
			<p><strong> {unesco_heritage && "Patrimonio de la Unesco"} </strong></p>
			{information && <p><strong>Información:</strong> {information}</p>}
			{web && <p> <a href={web} className="webLink" target="_blank"><strong>Saber más</strong></a></p>}
			<DirectionsButton latitude={latitude} longitude={longitude} />
			{ userData &&
				<>
				<div className="favButton">
					<button onClick={toggleFavourite}>
						{isFavourite ? "Quitar de favoritos" : "Añadir de favoritos"}
					</button>
				</div>
				<div className="visitButton">
					<button>Visitado</button>
				</div>
				</>
			}
		</div>
	)
}

export default PreromanCard;