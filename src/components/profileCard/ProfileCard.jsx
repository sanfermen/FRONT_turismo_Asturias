import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import PersonPinIcon from '@mui/icons-material/PersonPin';

import "./ProfileCard.css";

function ProfileCard() {
	const { userData } = useContext(AuthContext);
	

	return (
		<div className="profileCard">
			<div className="personIcon">
				<PersonPinIcon style={{ width: '100px', height: '100px' }} />
			</div>
			<div className="personData">
				<p><strong>Nombre:</strong>{userData.name}</p>
				<p><strong>Email:</strong>{userData.email}</p>
			</div>
		</div>
	)
}

export default ProfileCard;