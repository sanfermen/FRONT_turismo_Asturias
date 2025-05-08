import ProfileCard from "../../components/profileCard/profileCard";
import Navbar from "../../components/navBar/NavBar";

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
			</div>
		</>
		
	)
}

export default ProfilePage;