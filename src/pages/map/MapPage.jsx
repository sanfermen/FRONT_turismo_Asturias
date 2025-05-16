import { useEffect, useState, useContext } from "react";
import SideBar from "../../components/sideBar/SideBar";
import MapView from "../../components/mapLeaflet/MapLeaflet";
import NavBar from "../../components/navBar/NavBar"
import { getAllAreas } from "../../utils/api/area";
import { getAllBeaches } from "../../utils/api/beach";
import { getAllMuseums } from "../../utils/api/museum";
import { getAllRoutes } from "../../utils/api/route";
import { getAllPreroman } from "../../utils/api/preroman";
import { getAllRockArt } from "../../utils/api/rockArt";
import LoginModal from "../../components/loginModal/LoginModal";
import RegisterModal from "../../components/registerModal/RegisterModal";
import { AuthContext } from "../../context/AuthContext";
import { getFavouritesWithData } from "../../utils/api/favourite";
import { getVisitedWithData } from "../../utils/api/visited";

import "./MapPage.css";

function MapPage() {
	const { userData } = useContext(AuthContext);
	const [activeFilters, setActiveFilters] = useState([]);
	const [mapData, setMapData] = useState({});
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const [showSideBar, setShowSideBar] = useState(false);
	const [mapInstance, setMapInstance] = useState(null);

	// Para detectar si es pantalla de móvil
	const isMobile = window.innerWidth <= 768;

	// Para cerrar el SideBar al hacer clic en el mapa
	const handleMapClick = () => {
		if (isMobile && showSideBar) {
			setShowSideBar(false);
		}
	};

	const fetchFunctions = {
		area: getAllAreas,
		beach: getAllBeaches,
		museum: getAllMuseums,
		route: getAllRoutes,
		preroman: getAllPreroman,
		rockArt: getAllRockArt,
		favourite: getFavouritesWithData,
		visited: getVisitedWithData
	};

	// cargar los datos según el filtro activo
	useEffect(() => {
		const loadData = async () => {
			let newData = {};

			if (activeFilters.length === 0) {
				setMapData({});
				return;
			}

			if (activeFilters.includes("favourite")) {
				newData = await getFavouritesWithData();
			} else if (activeFilters.includes("visited")) {
				newData = await getVisitedWithData();
			} else {
				// Si no hay filtros especiales, cargar por tipo
				for (const type of activeFilters) {
					if (fetchFunctions[type]) {
						const data = await fetchFunctions[type]();
						newData[type] = data;
					}
				}
			}
			setMapData(newData);
		};
		loadData();
	}, [activeFilters]);

	return (
		<div className="mapPage">
			<NavBar 
				onLoginClick = {() => setShowLoginModal(true)} 
				onRegisterClick = {() => setShowRegisterModal(true)}	
			/>
				{showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
				{showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}

				{isMobile && (
					<button className="sidebar-toggle" onClick={() => setShowSideBar(!showSideBar)}>
						Filtros
					</button>
				)}
				
			<div className="mapLayout">
				<div className="map-leaflet">
					<MapView 
						activeFilters={activeFilters} 
						mapData={mapData} 
						setMapInstance={setMapInstance} 
						onMapClick={handleMapClick}
					/>
				</div>
				<aside className={`sideBar ${isMobile && showSideBar ? "visible" : ""}`}>
					<SideBar activeFilters={activeFilters} setActiveFilters={setActiveFilters} setMapData={setMapData} map={mapInstance}/>
				</aside>
			</div>
		</div>
	);
}

export default MapPage;