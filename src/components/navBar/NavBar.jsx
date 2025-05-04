import './NavBar.css';

function Navbar ({onRouteChange}){
    return (
        <nav className='navbar'>
            <div className="navbar-left" onClick={() => onRouteChange("home")}>
                <img src='/logo.png' alt='Logo' className='navbar-logo' />
			</div>
			<div className='navbar-center'>
                <span className='navbar-title'>MAPA TURÍSTICO DE ASTURIAS</span>
			</div>
			<div className='navbar-right'>
				<span className='navbar-link' onClick={() => onRouteChange("register")}>
					Registrarse
				</span>
				<span className='navbar-link' onClick={() => onRouteChange("login")}>
					Iniciar sesión
				</span>
            </div>
        </nav>
    )
}

export default Navbar;