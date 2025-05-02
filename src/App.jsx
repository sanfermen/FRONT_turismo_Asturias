import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AreaCard from './components/areaCard';
import { getAllAreas } from "./utils/api/area";

function App() {
	const [areas, setAreas] = useState([]);

	useEffect(() => {
		async function fetchAreas() {
			const data = await getAllAreas();
			setAreas(data);
		}
		fetchAreas();
	}, []);

	return (
		<div>
			<h1>Áreas de autocaravanas</h1>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{areas.length > 0 ? (
					areas.map((area) => <AreaCard key={area.area_id} area={area} />)
				) : (
					<p>Cargando áreas...</p>
				)}
			</div>
		</div>
	);
}

export default App
