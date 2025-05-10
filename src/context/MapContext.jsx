import { point } from "leaflet";
import { createContext, useState, useContext, useEffect } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
	const [targetPoint, setTargetPoint] = useState(null);

	useEffect(() => {
		if (targetPoint) {
			console.log("MapContext targetPoint actualizado", targetPoint);
		}
	}, [targetPoint]);

	return (
		<MapContext.Provider value={{ 
			targetPoint, 
			setTargetPoint: (point) => {
				console.log("setTargetPoint llamado con", point);
				setTargetPoint(point);
				} 
			}}>
			{children}
		</MapContext.Provider>
	);
}

export function useMapContext() {
	return useContext(MapContext);
}