import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root"
import MapPage from "./pages/map/MapPage";
import Home from "./pages/home/Home";
import ProfilePage from "./pages/profile/ProfilePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/map",
				element: <MapPage />
			},
			{
				path: "/profile",
				element: <ProfilePage />
			}	
		]
	}
])

export default router;