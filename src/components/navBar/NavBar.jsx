import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import PersonPinIcon from '@mui/icons-material/PersonPin';

import './NavBar.css';

function Navbar ({onLoginClick}){
	const { onLogout, userData } = useContext(AuthContext);
	const location = useLocation();
	const isMapPage = location.pathname ==="/map";

    return (
        <nav className='navbar'>
            <div className="navbar-left">
				<NavLink to="/">
                	<img src='/logo_aturitmo.png' alt='Logo' className='navbar-logo' />
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
						<button onClick={onLoginClick}>Iniciar Sesión</button> 
						{/* TODO register */}
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
    )
}

export default Navbar;