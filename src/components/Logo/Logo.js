import { NavLink } from 'react-router-dom';
import './Logo.css';


const Logo = () => {
    return (
        <NavLink className='logo' to="/">
            <img src="/logo.png" alt="Cosmos logo" height="92px" width="152px" />
        </NavLink>
    );
}

export default Logo;