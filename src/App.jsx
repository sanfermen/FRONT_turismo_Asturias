import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import './App.css'


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MapPage />} />
				{/* TODO Aquí el resto de las rutas */}
			</Routes>
		</Router>
	);
}

export default App
