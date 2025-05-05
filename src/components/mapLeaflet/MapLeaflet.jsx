import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from "leaflet";
import AreaCard from "../areaCard/AreaCard";
import BeachCard from "../beachCard/BeachCard";
import MuseumCard from "../museumCard/MuseumCard";
import PreromanCard from "../preromanCard/PreromanCard";
import RockArtCard from "../rockArtCard/RockArtCard";
import RouteCard from "../routeCard/RouteCard";

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

function MapView({ activeFilters, mapData }) {
	
	return (
	  <MapContainer center={[43.378564, -5.958032]} zoom={9} style={{ height: '100vh' }}>
		<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
			
			return (
			  <Marker
				key={`${type}-${getItemId(item, type)}`}
				position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
				icon={getIcon(type)}
				tipo={type}
			  >
				<Popup className="cardComponent-popup" maxWidth={320}>
				  {CardComponent ? (
					<CardComponent {...{ [type]: item }} />
				  ) : (
					// Por si no hay un componente específico para este tipo
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