import { useEffect, useState } from "react";
import { getFavouritesWithData } from "../../utils/api/favourite";
import FavouriteCard from "../cards/favouriteCard/FavouriteCard";
import { translateType } from "../../utils/helpers/translateType";

import "./FavouriteList.css";

function FavouriteList() {
	const [favouritesByType, setFavouritesByType] = useState({});
	const [openTypes, setOpenTypes] = useState([]);

	const allTypes = ["area", "route", "beach", "museum", "preroman", "rockArt"];

	useEffect(() => {
		const loadFavourites = async () => {
			const data = await getFavouritesWithData();
			setFavouritesByType(data);
		};
		loadFavourites();
	}, []);

	const toggleOpen = (type) => {
		setOpenTypes((prev) => (prev[0] === type ? [] : [type]));
	};

	return (
		<div className="favouriteList">
			<h2>FAVORITOS</h2>
			{allTypes.map((type => {
				const items = favouritesByType[type] || [];
				return (
					<div key={type} className="accordionSection">
						<button onClick={() => toggleOpen(type)}>
							{translateType(type)} {openTypes.includes(type) ? "▲" : "▼"}
						</button>
						{openTypes.includes(type) && (
							<div className="accordionContent">
								{items.length > 0 ? (
									items.map((item) => (
										<div key={item.area_id || item.route_id || item.museum_id || item.beach_id || item.preroman_id || item.rockArt_id}>
											<FavouriteCard item={item} />
										</div>
									))
								) : (
									<p style={{ padding: "1rem", color: "#666"}}>
										Aún no hay favoritos de este tipo.
									</p>
								)}
							</div>
						)}
					</div>
				);
			}))}
		</div>
	);
}

export default FavouriteList;