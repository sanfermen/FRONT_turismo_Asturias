import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { updateUser } from "../../../utils/api/user";

import "./ProfileCard.css";

function ProfileCard() {
	const { userData, setUserData } = useContext(AuthContext);
	const [showEditForm, setShowEditForm] = useState(false);
	const [name, setName] = useState(userData.name);
	const [email, setEmail] = useState(userData.email);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await updateUser(null, userData.user_id, {name, email});
		if (result.error) {
			setError(result.error);
		} else {
			setUserData({...userData, name, email});
			console.log("Formulario cerrado");
			setShowEditForm(false);
		}
	}
	
	return (
		<div className="profileCard">
			{showEditForm ? (
				<div className="editProfileForm">
					<form onSubmit={handleSubmit}>
						<label>Nombre: 
							<input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nombre" />
						</label>
						<label>Email: 
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
						</label>
						{error && <p className="modal-error">{error}</p>}
						<button className="editProfileButton" type="submit">Guardar cambios</button>
						<button className="editProfileButton" type="button"onClick={() => setShowEditForm(false)}>
						Cancelar
						</button>
					</form>
				</div>
			) : (
			<>
				<div className="personIcon">
					<PersonPinIcon style={{ width: '100px', height: '100px' }} />
				</div>
				<div className="personData">
					<p><strong>Nombre:</strong> {userData.name}</p>
					<p><strong>Email:</strong> {userData.email}</p>
				</div>
				<button className="editProfileButton" onClick={() => setShowEditForm(true)}>
					Editar perfil
				</button>
			</>
		)}
		</div>
	)
};

export default ProfileCard;