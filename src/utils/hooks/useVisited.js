import { useState, useEffect } from "react";
import { getVisited, addVisited, editVisited, removeVisited } from "../api/visited";

export function useVisited({userId, pointId, type, comments, visitDate}) {
	const [visitedId, setVisitedId] = useState(null);
	const [isVisited, setIsVisited] = useState(false);
}