import { NavLink } from 'react-router-dom';
import './Logo.css';


const Logo = () => {
    return (
        <NavLink className='logo' to="/">
            <img src="/logo.png" alt="Cosmos logo" />
        </NavLink>
    );
}

export default Logo;