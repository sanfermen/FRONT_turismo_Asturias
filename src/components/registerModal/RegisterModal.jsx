import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/ModalBase.css"

function RegisterModal({ onClose }) {
	const { onRegister } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden");
			return;
		}
		const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!strongPasswordRegex.test(password)) {
			setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
			return;
		}
		const result = await onRegister(name, email, password);
		if (result?.error) {
			setError(result.error);
		} else {
			onClose();
		}
	}

	
	return (
		<div className="modal-register">
			<div className="modal">
				<button className="close-button" onClick={onClose}>x</button>
				<h2>Registrarse</h2>
				<p className="modal-info">Regístrate para guardar tus sitios favoritos y visitados</p>
				<form onSubmit={handleSubmit}>
					<label>Name:
						<input type="text" required value={name} onChange={(e) => setName(e.target.value)}/>
					</label>
					<label>Email: 
						<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
					</label>
					<label>Contraseña:
						<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>
					<label>Repite la contraseña:
						<input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
					</label>
					{error && <p className="modal-error">{error}</p>}
					<button type="submit">Iniciar Sesión</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterModal;