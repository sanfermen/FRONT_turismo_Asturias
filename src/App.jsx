import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/map/MapPage";
import './App.css'
import { AuthProvider } from "./context/AuthContext";


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
