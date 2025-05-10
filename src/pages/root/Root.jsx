import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { MapProvider } from "../../context/MapContext";

function Root() {
	return (
		<AuthProvider>
			<MapProvider>
				<main>
					<Outlet />
				</main>
			</MapProvider>
		</AuthProvider>
	)
}

export default Root;