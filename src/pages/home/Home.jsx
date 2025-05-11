import { useEffect, useState } from "react";
import HomeSide from "../../components/homeSide/homeSide";
import MapButton from "../../components/mapButton/MapButton";
import "./Home.css"

function Home() {
	return(
		<div className="homePage">
			<div className="homeSide">
				<HomeSide />
			</div>
			<div className="logo">
				<img src="/logo_asturias_aturitmo.png" alt="Logo" />
			</div>
			<div className="homeButton">
				<MapButton />
			</div>
		</div>
	)
}

export default Home;