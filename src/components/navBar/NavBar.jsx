import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MenuIcon from '@mui/icons-material/Menu'

import './NavBar.css';

function Navbar ({onLoginClick, onRegisterClick}){
	const { onLogout, userData } = useContext(AuthContext);
	const [showMenu, setShowMenu] = useState(false);
	const location = useLocation();
	const isMapPage = location.pathname ==="/map";
	const isMobile = window.innerWidth <= 768;

    return (
		<>
			<nav className='navbar'>
				<div className="navbar-left">
					{isMobile && (
						<button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
							<MenuIcon fontSize="large" />
						</button>
					)}
					<NavLink to="/">
						<img src='/logo_asturias_aturitmo.png' alt='Logo' className='navbar-logo' />
					</NavLink>
				</div>
				<div className='navbar-center'>
					{isMapPage ? (
						"MAPA TURÍSTICO DE ASTURIAS" 
					) : (
						<NavLink to="/map">MAPA TURÍSTICO DE ASTURIAS</NavLink>
					)}
				</div>
				<div className='navbar-right'>
					{!userData ? (
						<>
							<button onClick={onRegisterClick}>Registrarse</button>
							<button onClick={onLoginClick}>Iniciar Sesión</button> 
						</>
					) : (
						<>
						<NavLink to="/profile">
							<PersonPinIcon fontSize='large'/> {userData.name}
						</NavLink>
						<button onClick={onLogout}>Cerrar Sesión</button>
						</>
					)}
				</div>
			</nav>

			{isMobile && showMenu && (
				<div className="mobile-menu">
					{!userData ? (
						<>
							<button onClick={onRegisterClick}>Registrarse</button>
							<button onClick={onLoginClick}>Iniciar Sesión</button>
						</>
					) : (
						<>
							<NavLink to="/profile" onClick={() => setShowMenu(false)}>
								<PersonPinIcon fontSize="large" /> {userData.name}
							</NavLink>
							{location.pathname === "/profile" && (
								<NavLink to="/map" onClick={() => setShowMenu(false)}>
									Volver al mapa
								</NavLink>
							)}
							<button onClick={onLogout}>Cerrar Sesión</button>
						</>
					)}
				</div>
			)}
		</>
    )
}

export default Navbar;