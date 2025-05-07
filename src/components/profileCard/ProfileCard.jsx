import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import "./ProfilePage.css";
import { use } from "react";

function ProfileCard() {
	const { userData } = useContext(AuthContext);
	
}