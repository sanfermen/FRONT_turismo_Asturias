import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import { useFavourite } from "../../../utils/hooks/useFavourite";
import { useVisited } from "../../../utils/hooks/useVisited";
import DirectionsButton from "../../directionsButton/DirectionsButton";

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
	const {isVisited, visitData, handleAddVisited, handleRemoveVisited, error} = useVisited({
		userId: userData?.user_id,
		pointId: preroman.preroman_id,
		type: "preroman"
	});
	const [showVisitForm, setShowVisitForm] = useState(false);

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
	)
}

export default PreromanCard;