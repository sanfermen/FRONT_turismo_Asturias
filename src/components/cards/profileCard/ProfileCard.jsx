import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import PersonPinIcon from '@mui/icons-material/PersonPin';

import "./ProfileCard.css";

function ProfileCard() {
	const { userData } = useContext(AuthContext);
	const [showEdit, setShowEdit] = useState(false);
	

	return (
		<div className="profileCard">
			<div className="personIcon">
				<PersonPinIcon style={{ width: '100px', height: '100px' }} />
			</div>
			<div className="personData">
				<p><strong>Nombre:</strong>{userData.name}</p>
				<p><strong>Email:</strong>{userData.email}</p>
			</div>
			<button className="editProfileButton" onClick={() => setShowEdit(true)}>
				Editar perfil
			</button>
		</div>
	)
}

export default ProfileCard;