import { useEffect, useState } from "react";
import { getVisitedWithData } from "../../utils/api/visited";
import VisitedCard from "../cards/visitedCard/VisitedCard";
import { translateType } from "../../utils/helpers/translateType";

import "./VisitedList.css";

function VisitedList() {
	const [visitedByType, setVisitedByType] = useState({});
	const [openTypes, setOpenTypes] = useState([]);

	useEffect(() => {
		const loadVisited = async () => {
			const data = await getVisitedWithData();
			setVisitedByType(data);
		};
		loadVisited();
	}, []);

	const toggleOpen = (type) => {
		setOpenTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
	};

	return (
		<div className="visitedList">
			<h2>VISITADOS</h2>
			{Object.entries(visitedByType)
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
									<VisitedCard item={item} />
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default VisitedList;