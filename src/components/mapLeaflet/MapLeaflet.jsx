import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";
import AreaCard from "../cards/areaCard/AreaCard";
import BeachCard from "../cards/beachCard/BeachCard";
import MuseumCard from "../cards/museumCard/MuseumCard";
import PreromanCard from "../cards/preromanCard/PreromanCard";
import RockArtCard from "../cards/rockArtCard/RockArtCard";
import RouteCard from "../cards/routeCard/RouteCard";
import { useMapContext } from "../../context/MapContext";

import "leaflet/dist/leaflet.css";
import "./markerCluster.css"
import "./MapLeaflet.css";

// Solución al problema de iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CardComponents = {
	area: AreaCard,
	beach: BeachCard,
	museum: MuseumCard,
	preroman: PreromanCard,
	rockArt: RockArtCard,
	route: RouteCard
}

// Crear iconos de cluster según el tipo
function createClusterCustomIcon(cluster) {
	const markers = cluster.getAllChildMarkers();
	const tipo = markers[0]?.options.tipo || "default";
	const count = cluster.getChildCount();
  
	let sizeClass = "small";
	if (count >= 15) sizeClass = "medium";
	if (count >= 30) sizeClass = "large";
  
	return L.divIcon({
	  html: `<div class="marker-cluster ${tipo} ${sizeClass}"><span>${count}</span></div>`,
	  className: "marker-cluster-wrapper",
	  iconSize: L.point(40, 40, true)
	});
  }

// Obtener markers según el tipo de sitio
function getIcon(type) {
	return L.icon({
		iconUrl:`../../assets/icons/${type}.png`,
		iconSize: [60, 70],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30]
	});
}

// Obtener id único del elemento
function getItemId(item, type) {
	return item[`${type}_id`] || item.name;
}

// Crear botón de localización
function LocationButton() {
	const map = useMap();

	useEffect(() => {
		const button = L.easyButton("fa-dot-circle-o", () => {
			map.locate().on("locationfound", function (e) {
				map.flyTo(e.latlng, 14);
			});
		});
		button.addTo(map);
		return () =>{
			map.removeControl(button);
		};
	}, [map]);
	return null;
}

// Para escuchar al targetPoint
function MapEventHandler({ mapData, markerRefs }) {
	const map = useMap();
	const { targetPoint } = useMapContext();

	useEffect(() => {
		console.log("ESCUCHANDO targetPoint:", targetPoint);
		if (!targetPoint) {
			return;
		}
		const {type, id} = targetPoint;
		const points = mapData[type];
		if (!points) {
			console.warn(`No se encontraron puntos para el tipo: ${type}`);
			return;
		};

		const point = points.find((item) => {
			const itemId = item[`${type}_id`];
			return itemId === id;
		});
		if (!point) {
			console.warn(`Punto no encontrado para type=${type}, id=${id}`);
			return;
		}
		console.log("Punto encontrado", point);
		const lat = parseFloat(point.latitude);
		const lng = parseFloat(point.longitude);
		if (isNaN(lat) || isNaN(lng)) {
			console.warn("Coordenadas invalidas", point.latitude, point.longitude);
			return;
		}
		map.flyTo([lat, lng], 15);

		try {
			const ref = markerRefs.current[type]?.[id];
			if (ref) {
				console.log("Abriendo popup para", type, id);
				setTimeout(() => ref.openPopup(), 500);
			} else {
				console.warn("No se encontró referencia para el marcador:", type, id);
			}
		} catch (error) {
			console.error("Error al abrir el popup", error);
		}
	}, [targetPoint, mapData, markerRefs, map]);
	return null;
}

function MapView({ activeFilters, mapData }) {
	const { targetPoint } = useMapContext();
	useEffect(() => {
		console.log("Mapview ha recibido targetPoint", targetPoint);
	}, [targetPoint]);
	const markerRefs = useRef({});

	console.log("Dentro de MapView, targetPoint es:", targetPoint);
	
	return (
	  <MapContainer center={[43.378564, -5.958032]} zoom={9} style={{ height: '100vh' }}>
		<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
		<LocationButton />
		<MapEventHandler mapData={mapData} markerRefs={markerRefs} />
		<MarkerClusterGroup
		  chunkedLoading
		  showCoverageOnHover={false}
		  spiderfyOnMaxZoom
		  zoomToBoundsOnClick
		  iconCreateFunction={createClusterCustomIcon}
		>
		{activeFilters.flatMap((type) =>
			(mapData[type] || [])
				.filter(item =>
					!isNaN(Number(item.latitude)) &&
					!isNaN(Number(item.longitude)) &&
					getItemId(item, type)
			)
		  	.map((item) => {
			const CardComponent = CardComponents[type];
			const position = [parseFloat(item.latitude), parseFloat(item.longitude)];
			
			return (
			  <Marker
				ref={(ref) => {
					if (ref) {
						const id = getItemId(item, type);
						if (!markerRefs.current[type]) {
							markerRefs.current[type] = {}};
						markerRefs.current[type][id] = ref;
					}
				}}
				key={`${type}-${getItemId(item, type)}`}
				position={position}
				icon={getIcon(type)}
				tipo={type}
			  >
				<Popup className="cardComponent-popup" maxWidth={320}>
					{CardComponent ? (
						<CardComponent {...{ [type]: item }} />
				  	) : (
						<div>
						<strong>{item.name}</strong>
						<br />
						{item.description || "Sin descripción"}
						</div>
					)}
				</Popup>
			  </Marker>
			);
		  })
		)}
		</MarkerClusterGroup>
	  </MapContainer>
	);
}

export default MapView;