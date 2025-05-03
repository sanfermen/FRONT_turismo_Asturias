import { useEffect, useState } from "react";
import SideBar from "../components/sideBar/SideBar";
import MapView from "../components/mapLeaflet/MapLeaflet";
import "./MapPage.css";
import { getAllAreas } from "../utils/api/area";
import { getAllBeaches } from "../utils/api/beach";
import { getAllMuseums } from "../utils/api/museum";
import { getAllRoutes } from "../utils/api/route";
import { getAllPreroman } from "../utils/api/preroman";
import { getAllRockArt } from "../utils/api/rockArt";


function MapPage() {
	const [activeFilters, setActiveFilters] = useState(["area"]);
	const [mapData, setMapData] = useState({});
	const fetchFunctions = {
		area: getAllAreas,
		beach: getAllBeaches,
		museum: getAllMuseums,
		route: getAllRoutes,
		preroman: getAllPreroman,
		rockArt: getAllRockArt
	};

	useEffect(() => {
		activeFilters.forEach(async (type) => {
			if (!mapData[type]) {
				try {
					const data = await fetchFunctions[type]();
					console.log("Datos cargados", type, data);
					setMapData((prev) => ({ ...prev, [type]: data }));
				} catch (err) {
					console.error(`Error cargando datos de ${type}`,err);
				}
			}
		});
	}, [activeFilters]);

	return (
		<div className="mapPage">
			<header className="navbar">MAPA TURÍSTICO DE ASTURIAS</header> {/* TODO añadir el navbar */}
			<div className="mapLayout">
				<div className="mapLeaflet">
					<MapView activeFilters={activeFilters} mapData={mapData} />
				</div>
				<aside className="sideBar">
					<SideBar activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
				</aside>
			</div>
		</div>
	);
}

export default MapPage;