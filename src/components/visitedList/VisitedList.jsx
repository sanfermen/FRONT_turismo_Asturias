import { useEffect, useState } from "react";
import { getVisitedWithData } from "../../utils/api/visited";
import VisitedCard from "../cards/visitedCard/VisitedCard";
import { translateType } from "../../utils/helpers/translateType";

import "./VisitedList.css";

function VisitedList() {
	const [visitedByType, setVisitedByType] = useState({});
	const [openTypes, setOpenTypes] = useState([]);

	const allTypes = ["area", "route", "beach", "museum", "preroman", "rockArt"];

	useEffect(() => {
		const loadVisited = async () => {
			const data = await getVisitedWithData();
			setVisitedByType(data);
		};
		loadVisited();
	}, []);

	const toggleOpen = (type) => {
		setOpenTypes((prev) => (prev[0] === type ? [] : [type]));
	};

	return (
		<div className="visitedList">
			<h2>VISITADOS</h2>
			{allTypes.map((type => {
				const items = visitedByType[type] || [];
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
											<VisitedCard item={item} />
										</div>
									))
								) : (
									<p style={{ padding: "1rem", color: "#666"}}>
										Aún no hay visitados de este tipo.
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

export default VisitedList;