import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFavourite } from "../../utils/hooks/useFavourite";

import "./RockArtCard.css";

function RockArtCard({rockArt}) {
	const {
		name,
		image,
		period,
		information,
		web
	} = rockArt;

	const { userData } = useContext(AuthContext);
	const { isFavourite, toggleFavourite } = useFavourite({
		userId: userData?.user_id,
		pointId: rockArt.rockArt_id,
		type: "rockArt"
	});

	return (
		<div className="rockArt_card">
			<img src={image} alt={name} />
			<h2>{name}</h2>
			<p><strong>Periodo:</strong> {period}</p>
			<p><strong>Información:</strong> {information}</p>
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
	)
};

export default RockArtCard;