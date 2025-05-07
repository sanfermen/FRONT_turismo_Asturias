import fetchData from "./fetch.js";
import { saveToken, removeToken } from "../localStorage.js";

async function login(email, password) {
	const data = {
		email,
		password
	}
	const result = await fetchData("/auth/login", "POST", data);
	return result;
}

async function register(name, email, password) {
	const data = {
		name,
		email,
		password
	}
	const result = await fetchData("/auth/register", "POST", data);
	if (result.token) {
		saveToken(result.token);
	}
	return result;
}

async function logout() {
	const result = await fetchData("/auth/logout", "POST");
	removeToken();
	return result;
}

async function getUserInfo() {
	const 
}

export {
	login,
	register,
	logout
}