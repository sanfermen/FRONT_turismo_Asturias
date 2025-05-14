import { useState, useEffect } from "react";
import { getFavourites, addFavourites, removeFavourites } from "../api/favourite";

export function useFavourite({ userId, pointId, type}) {
	const [isFavourite, setIsFavourite] = useState(false);
	const [favouriteId, setFavouriteId] = useState(null);

	useEffect(() => {
		const check = async () => {
			if (!userId) {
				return;
			}
			const result = await getFavourites();
			const match = result.find(
				(fav) => fav.point_id === pointId && fav.type === type
			);
			if (match) {
				setIsFavourite(true);
				setFavouriteId(match.favourite_id);
			} else {
				setIsFavourite(false);
				setFavouriteId(null);
			}
		};
		check();
	}, [userId, pointId, type]);

	const toggleFavourite = async () => {
		if (isFavourite) {
			await removeFavourites(favouriteId);
			setIsFavourite(false);
			setFavouriteId(null);
		} else {
			const result = await addFavourites({user_id: userId, point_id: pointId, type});
			setIsFavourite(true);
			setFavouriteId(result.favourite_id);
		}
	};
	return { isFavourite, toggleFavourite};
}