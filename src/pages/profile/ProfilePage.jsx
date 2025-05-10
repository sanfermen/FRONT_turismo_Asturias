import ProfileCard from "../../components/cards/profileCard/profileCard";
import Navbar from "../../components/navBar/NavBar";
import FavouriteList from "../../components/FavouriteList/FavouriteList";

import "./ProfilePage.css";

function ProfilePage() {
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
					<FavouriteList />
				</div>
			</div>
		</>
		
	)
}

export default ProfilePage;