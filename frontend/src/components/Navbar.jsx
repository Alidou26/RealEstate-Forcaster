import '../styles/navbar.css';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return(
        <header>
            <img className='logo' src={logo} alt='logo'></img>
            <nav className='nav'>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li><Link to="/forcaster">Forcaster</Link></li>
                    <li><Link to="/premium">Premium</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className='srb'>
                <button className='signin-btn'>Sign in</button>
                <button className='register-btn'>Register</button>
            </div>
            <div className='hamburger' onClick={toggleMenu}>
                <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            </div>
        </header>
    );
}

export default Navbar;