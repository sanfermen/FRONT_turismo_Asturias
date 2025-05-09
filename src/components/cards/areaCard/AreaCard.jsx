import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { useFavourite } from "../../../utils/hooks/useFavourite";
import { useVisited } from "../../../utils/hooks/useVisited";
import DirectionsButton from "../../DirectionsButton/DirectionsButton";

import "./AreaCard.css";

function AreaCard({ area }) {
	const {
		name,
		image,
		latitude,
		longitude,
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
	const {isVisited, visitData, handleAddVisited, handleRemoveVisited, error} = useVisited({
		userId: userData?.user_id,
		pointId: area.area_id,
		type: "area"
	});
	const [showVisitForm, setShowVisitForm] = useState(false);

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
			<DirectionsButton latitude={latitude} longitude={longitude} />
			{userData && 
				<>
					<div className="favButton">
						<button onClick={toggleFavourite}>
							{isFavourite ? "Quitar de favoritos" : "Añadir a favoritos"}
						</button>
					</div>
					{isVisited ? (
						<div className="visitInfo">
							<p>Visitado el {new Date(visitData.visit_date).toLocaleDateString()}</p>
							{visitData.comments && <p>Comentario: {visitData.comments}</p>}
							<button onClick={handleRemoveVisited}>Quitar visitado</button>
						</div>
					) : (
						<>
							{showVisitForm ? (
								<form onSubmit={(e) => {
									e.preventDefault();
									const date = e.target.date.value;
									const comment = e.target.comment.value;
									handleAddVisited(date, comment);
									setShowVisitForm(false);
								}}>
									<input type="date" name="date" required />
									<textarea
										name="comment"
										placeholder="Añade tus comentarios"
										maxLength="400"
									/>
									<button type="submit">Guardar visita</button>
									<button type="button" onClick={() => setShowVisitForm(false)}>Cancelar</button>
									{error && <p className="error">{error}</p>}
								</form>
							) : (
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setShowVisitForm(true);
									}}
								>	Añadir Visitado
								</button>
							)}
						</>
					)}
				</>
			}	
		</div>
	);
}

export default AreaCard;
