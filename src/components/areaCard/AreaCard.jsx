import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useFavourite } from "../../utils/hooks/useFavourite";

import "./AreaCard.css";

function AreaCard({ area }) {
	const {
		name,
		image,
		address,
		type,
		drinking_water,
		waste_water,
		black_water,
		places,
		max_stay
	} = area;

	const { userData } = useContext(AuthContext);
	const { isFavourite, toggleFavourite } = useFavourite({
		userId: userData?.user_id,
		pointId: area.area_id,
		type: "area"
	});


	return (
		<div className="area_card">
			<img src={image} alt={name}/>
			<h2>{name}</h2>
			<p><strong>Dirección:</strong> {address}</p>
			<p><strong>Tipo:</strong> {type === "public" ? "Pública" : "Privada"}</p>
			{places && <p><strong>Plazas:</strong> {places}</p>}
			<p><strong>Estancia máxima:</strong> {max_stay || "Sin límite"}</p>
			<p>
				<strong>Servicios:</strong>{" "}
				{[
					drinking_water && "Agua potable",
					waste_water && "Aguas grises",
					black_water && "Aguas negras"
				].filter(Boolean).join(", ") || "Ninguno"}
			</p>
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

export default AreaCard;
