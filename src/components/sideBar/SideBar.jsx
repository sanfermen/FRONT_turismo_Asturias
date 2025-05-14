import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getFavouritesWithData } from "../../utils/api/favourite";
import { getVisitedWithData } from "../../utils/api/visited";
import coordinates from "../../data/concejos-coords.json";

import "./SideBar.css";

function SideBar({ activeFilters, setActiveFilters, setMapData, map }) {
	//normalize("NFD") separar letra con tilde en letra+tilde. Replace para quitar la tilde
	const normalize = (str) =>
		str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

	const { userData } = useContext(AuthContext);
	const [search, setSearch] = useState("");
	// Filtrando los nombres de los concejos
	const suggestions = Object.keys(coordinates).filter((key) =>
		normalize(key).includes(normalize(search))
	);

	const SearchByCouncil = (input) => {
		const inputValue = input || search;
		const normalizedInput = normalize(inputValue);

		const matchKey = Object.keys(coordinates).find(
			(key) => normalize(key) === normalizedInput
		)
		const coords = matchKey ? coordinates[matchKey] : null;
		if (!coords) {
			alert("Concejo no encontrado");
			return;
		}
		map.setView([coords.lat, coords.lon], 12)
	};

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
			<div className="council-search">
				<h4>Buscar concejo</h4>
				<input type="text" value={search} onChange={(e) =>
					setSearch(e.target.value)}
					placeholder="Ej. Gijón"
					autoComplete="off"/>
				{search && suggestions.length > 0 && (
					<ul className="suggestion-list">
						{suggestions.map((suggestion) => (
							<div key={suggestion} onClick={() => {
								setSearch("");
								SearchByCouncil(suggestion);
							}}>
								{suggestion}
							</div>
						))}
					</ul>
				)}
				{search && suggestions.length === 0 && (
					<p className="no-results">Sin resultados</p>
				)}
				<button className="reset-view" onClick={() => {
					if (map && typeof map.setView === "function") {
						map.setView([43.378564, -5.958032], 9);
					}
				}}>
					Ver todo Asturias
				</button>
			</div>
		</div>
	);
}

export default SideBar;