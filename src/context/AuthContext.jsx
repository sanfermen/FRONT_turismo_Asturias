import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, logout, getUserInfo } from "../utils/api/auth";
import { saveToken, removeToken } from "../utils/localStorage";

const AuthContext = createContext({
	userData: {},
    onLogin: async () => { },
	onRegister: async () => { },
    onLogout: () => { }
});

const AuthProvider = ({children}) => {
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		handleGetUserInfo();
	}, [])
	const handleGetUserInfo = async() => {
		const result = await getUserInfo();
		if(result.user) {
			setUserData(result.user);
		}
	}

	const handleLogin = async (email, password) => {
		const result = await login(email, password);
		if (result.error) {
			removeToken();
			return result.error;
		} else {
			setUserData(result.user);
			saveToken(result.token);
			navigate("/map");
			return result;
		}
	}

	const handleLogout = async () => { //TODO comprobar
		logout();
		setUserData(null);
		navigate("/map");
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