import './Header.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Logo/>
            <nav>
                <NavLink className="nav-link" activeClassName="active-nav-link" to="/explore">Explore</NavLink>
                <NavLink className="nav-link" activeClassName="active-nav-link" to="/login">Sign In</NavLink>
                <NavLink className="nav-link" activeClassName="active-nav-link" to="/register">Sign Up</NavLink>
            </nav>
        </header>
    );
}

export default Header;