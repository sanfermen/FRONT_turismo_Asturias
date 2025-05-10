import { useEffect, useState } from "react";
import { getFavouritesWithData } from "../../utils/api/favourite";
import FavouriteCard from "../cards/favouriteCard/FavouriteCard";

import "./FavouriteList.css";

function translateType(type) {
	switch (type) {
		case "area": return "Áreas";
		case "route": return "Rutas";
		case "beach": return "Playas";
		case "museum": return "Museos";
		case "preroman": return "Prerrománico";
		case "rockArt": return "Arte rupestre";
		default: return type;
	}
}

function FavouriteList({}) {
	const [favouritesByType, setFavouritesByType] = useState({});
	const [openTypes, setOpenTypes] = useState([]);

	useEffect(() => {
		const loadFavourites = async () => {
			const data = await getFavouritesWithData();
			setFavouritesByType(data);
		};
		loadFavourites();
	}, []);

	const toggleOpen = (type) => {
		setOpenTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
	};

	return (
		<div className="favouriteList">
			<h2>FAVORITOS</h2>
			{Object.entries(favouritesByType)
				.filter(([_, items]) => Array.isArray(items))
				.map(([type, items]) => (
				<div key={type} className="accordionSection">
					<button onClick={() => toggleOpen(type)}>
						{translateType(type)} {openTypes.includes(type) ? "▲" : "▼"}
					</button>
					{openTypes.includes(type) && (
						<div className="accordionContent">
							{items.map((item) => (
								<div key={item.area_id || item.route_id || item.museum_id || item.beach_id || item.preroman_id || item.rockArt_id}>
									<FavouriteCard item={item} />
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default FavouriteList;