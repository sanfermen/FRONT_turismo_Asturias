import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { useFavourite } from "../../../utils/hooks/useFavourite";
import { useVisited } from "../../../utils/hooks/useVisited";
import DirectionsButton from "../../DirectionsButton/DirectionsButton";

import "./BeachCard.css";

function BeachCard({ beach }) {
	const {
		name,
		image,
		latitude,
		longitude,
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
	const {isVisited, visitData, handleAddVisited, handleRemoveVisited, error} = useVisited({
		userId: userData?.user_id,
		pointId: beach.beach_id,
		type: "beach"
	});
	const [showVisitForm, setShowVisitForm] = useState(false);

	return (
		<div className="beach_card">
			<img src={image} alt={image} />
			<h2>{name}</h2>
			<p><strong>Información:</strong> {information}</p>
			<p><strong>Servicios:</strong> {services}</p>
			<p><strong>Tipo de playa:</strong> {beach_type}</p>
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

export default BeachCard;