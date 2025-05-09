import { useState, useEffect } from "react";
import { getVisited, addVisited, removeVisited } from "../api/visited";

export function useVisited({userId, pointId, type}) {
	const [isVisited, setIsVisited] = useState(false);
	const [visitedId, setVisitedId] = useState(null);
	const [visitData, setVisitData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const checkVisited = async () => {
			if (!userId) {
				return;
			}
			const result = await getVisited();
			const match = result.find(
				(item) => item.point_id === pointId && item.type === type
			);
			if (match) {
				setIsVisited(true);
				setVisitedId(match.visited_id);
				setVisitData(match);
			}
		};
		checkVisited();
	}, [userId, pointId, type]);

	const handleAddVisited = async (visit_date, comments) => {
		try {
			setError(null);
			const result = await addVisited({
				user_id: userId,
				point_id: pointId,
				type,
				visit_date,
				comments
			});
			setIsVisited(true);
			setVisitedId(result.visited_id);
			setVisitData(result);
		} catch (err) {
			console.error("Error al añadir visitado", err);
			setError(err?.error || "Error desconocido");
		}
	};

	const handleRemoveVisited = async () => {
		await removeVisited(visitedId);
		setIsVisited(false);
		setVisitedId(null);
		setVisitData(null);
	};
	return {
		isVisited,
		visitData,
		handleAddVisited,
		handleRemoveVisited
	};
}