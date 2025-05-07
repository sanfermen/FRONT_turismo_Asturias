import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './NavBar.css';

function Navbar ({onLoginClick}){
	const { onLogout, userData } = useContext(AuthContext);

    return (
        <nav className='navbar'>
            <div className="navbar-left">
				<NavLink to="/">
                	<img src='/logo_aturitmo.png' alt='Logo' className='navbar-logo' />
				</NavLink>
			</div>
			<div className='navbar-center'>
                <NavLink to="/map">MAPA TURÍSTICO DE ASTURIAS</NavLink>
			</div>
			<div className='navbar-right'>
				{!userData ? (
					<>
						<button onClick={onLoginClick}>Iniciar Sesión</button> 
						{/* TODO register */}
					</>
				) : (
					<>
					<NavLink to="/profile">Mi perfil</NavLink>
					<button onClick={onLogout}>Cerrar Sesión</button>
					</>
				)}
            </div>
        </nav>
    )
}

export default Navbar;