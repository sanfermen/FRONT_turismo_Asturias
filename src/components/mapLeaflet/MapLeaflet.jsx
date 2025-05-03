import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AreaCard from "../areaCard/AreaCard";
import "./MapLeaflet.css";

// Solución al problema de iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CardComponents = {
	area: AreaCard
}

function getIcon(type) {
	return L.icon({
		iconUrl:`../../assets/icons/${type}.png`,
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		popupAnchor: [0, -30]
	});
}

function getItemId(item, type) {
	return item[`${type}_id`] || item.name;
}

function MapView({ activeFilters, mapData }) {
	
	return (
	  <MapContainer center={[43.378564, -5.958032]} zoom={8} style={{ height: '100vh' }}>
		<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
		{activeFilters.map((type) =>
		mapData[type]
			?.filter(item =>
			!isNaN(Number(item.latitude)) &&
			!isNaN(Number(item.longitude)) &&
			getItemId(item, type)
			)
		  	.map((item) => {
			const CardComponent = CardComponents[type];
			
			return (
			  <Marker
				key={`${type}-${getItemId(item, type)}`}
				position={[Number(item.latitude), Number(item.longitude)]}
				icon={getIcon(type)}
			  >
				<Popup className="cardComponent-popup" maxWidth={320}>
				  {CardComponent ? (
					<CardComponent {...{ [type]: item }} />
				  ) : (
					// Fallback por si no hay un componente específico para este tipo
					<div>
					  <strong>{item.nombre || item.name}</strong>
					  <br />
					  {item.descripcion || "Sin descripción"}
					</div>
				  )}
				</Popup>
			  </Marker>
			);
		  })
		)}
	  </MapContainer>
	);
}

export default MapView;