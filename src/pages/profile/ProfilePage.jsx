import { useState } from "react";
import ProfileCard from "../../components/cards/profileCard/profileCard";
import Navbar from "../../components/navBar/NavBar";
import FavouriteList from "../../components/FavouriteList/FavouriteList";

import "./ProfilePage.css";

function ProfilePage() {
	const [activeFilters, setActiveFilters] = useState([]);

	return (
		<>
			<header>
				<Navbar />
			</header>
			<div className="profileLayout">
				<div className="profilePageCard">
					<ProfileCard />
				</div>
				<div className="favouriteList">
					<FavouriteList  setActiveFilters={setActiveFilters}/>
				</div>
			</div>
		</>
		
	)
}

export default ProfilePage;