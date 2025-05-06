import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root"
import MapPage from "./pages/map/MapPage";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/home",
				element: <Home />
			},
			{
				path: "/map",
				element: <MapPage />
			}
		]
	}
])

export default router;