import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getFavouritesWithData } from "../../utils/api/favourite";
import { getVisitedWithData } from "../../utils/api/visited";

import "./SideBar.css";

function SideBar({ activeFilters, setActiveFilters, setMapData }) {
	const { userData } = useContext(AuthContext);
	const handleChange = (e) => {
		const { value, checked } = e.target;

		if (value === "favourite" || value === "visited") {
			if (checked) {
				//Quitar los otros filtros
				setActiveFilters([value]);
			} else {
				// Si se desactiva, borrar filtros y datos
				setActiveFilters([]);
			}
			return;
		} else {
			// Si se marca otro tipo, se quitan favoritos y visitados
			setActiveFilters((prev) => {
				const withoutSpecials = prev.filter(f => f !== "favourite" && f !== "visited");
				if (checked) return [...withoutSpecials, value];
				return withoutSpecials.filter(f => f !== value);
		});
		}
	};
	return (
		<div className="checkbox-list">
			<label><input type="checkbox" value="area" checked={activeFilters.includes("area")} onChange={handleChange} />Áreas</label>
			<label><input type="checkbox" value="beach" checked={activeFilters.includes("beach")} onChange={handleChange} />Playas</label>
			<label><input type="checkbox" value="museum" checked={activeFilters.includes("museum")} onChange={handleChange} />Museos</label>
			<label><input type="checkbox" value="route" checked={activeFilters.includes("route")} onChange={handleChange} />Rutas</label>
			<label><input type="checkbox" value="preroman" checked={activeFilters.includes("preroman")} onChange={handleChange} />Arte prerrománico</label>
			<label><input type="checkbox" value="rockArt" checked={activeFilters.includes("rockArt")} onChange={handleChange} />Arte rupestre</label>
			{userData &&
				<>
					<label><input type="checkbox" value="favourite" checked={activeFilters.includes("favourite")} onChange={handleChange}/>Favoritos</label>
					<label><input type="checkbox" value="visited" checked={activeFilters.includes("visited")} onChange={handleChange}/>Visitados</label>
				</>
				}
		</div>
	);
}

export default SideBar;