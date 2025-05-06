import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, logout } from "../utils/api/auth";
import { saveToken, removeToken } from "../utils/localStorage";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (email, password) => {
		const result = await login(email, password);
		if (result.error) {
			removeToken();
			return result.error;
		} else {
			setUserData(result.user);
			saveToken(result.token);
			navigate("/"); //TODO a qué ruta va a mandar
			return null;
		}
	}

	const handleLogout = async () => { //TODO comprobar
		const result = await logout();
		setUserData(null);
		navigate("/");
	}

	const handleRegister = async (name, email, password) => {
		const result = await register(name, email, password);
		if (result.error) {
			removeToken();
			return result.error;
		} else {
			setUserData(result.user);
			saveToken(result.token);
			navigate("/"); //TODO a qué ruta va a mandar
			return null;
		}
	}
	return(
		<AuthContext.Provider value={{userData:userData,onLogin:handleLogin,onLogout:handleLogout, onRegister:handleRegister}}>
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthProvider,
	AuthContext
};