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
import { useMapContext } from "../../context/MapContext";

import "./MapPage.css";

function MapPage() {
	const { userData } = useContext(AuthContext);
	const { targetPoint } = useMapContext();
	const [activeFilters, setActiveFilters] = useState([]);
	const [mapData, setMapData] = useState({});
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const fetchFunctions = {
		area: getAllAreas,
		beach: getAllBeaches,
		museum: getAllMuseums,
		route: getAllRoutes,
		preroman: getAllPreroman,
		rockArt: getAllRockArt
	};

	useEffect(() => {
		if (targetPoint && !activeFilters.includes(targetPoint.type)) {
			// para que no se activen 2 veces el mismo tipo de datos
			setActiveFilters((prev) => 
				prev.includes(targetPoint.type) ? prev : [...prev, targetPoint.type]);
		}
	}, [targetPoint]);

	useEffect(() => {
		activeFilters.forEach(async (type) => {
			if (!mapData[type]) {
				try {
					fetchFunctions[type]().then((data) => {
						setMapData((prev) => ({ ...prev, [type]: data }));
					});
				} catch (err) {
					console.error(`Error cargando datos de ${type}`,err);
				}
			}
		});
	}, [activeFilters]);

	console.log("render");

	return (
		<div className="mapPage">
			<NavBar 
				onLoginClick = {() => setShowLoginModal(true)} 
				onRegisterClick = {() => setShowRegisterModal(true)}	
			/>
				{showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
				{showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
			<div className="mapLayout">
				<div className="map-leaflet">
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