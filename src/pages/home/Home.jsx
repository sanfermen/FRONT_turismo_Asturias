import { useEffect, useState } from "react";
import HomeSide from "../../components/homeSide/homeSide";
import "./Home.css"

function Home() {
	return(
		<div className="homePage">
			<div className="homeSide">
				<HomeSide />
			</div>
			<div className="homeTitle">
				<h1>ASTURIAS A TU RITMO</h1>
			</div>
		</div>
	)
}

export default Home;