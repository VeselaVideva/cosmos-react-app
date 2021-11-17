import './Logo.css';
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <NavLink className='logo' to="/">
            <img src="logo.png" alt="Cosmos logo" />
        </NavLink>
    );
}

export default Logo;