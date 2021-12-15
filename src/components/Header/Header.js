import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './Header.css';

import { AuthContext } from '../../contexts/AuthContext';
import { types, NotificationContext } from '../../contexts/NotificationContext';

import Logo from '../Logo/Logo';

import { logOut } from '../../services/authService';
import { getUsername } from '../../utils/getUsername';


const Header = ({
    history
}) => {
    let historyHook = useHistory();

    const { currentUser } = useContext(AuthContext);

    const { showNotification } = useContext(NotificationContext);

    const username = getUsername(currentUser);

    const handleLogout = async (e) => {
        e.preventDefault();

        await logOut()
            .then(() => {
                showNotification('You logged out successfully!', types.success);
                historyHook.push('/');
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            });
    }

    let userNav = (
        <div id="user">
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/populate">Populate</NavLink>
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/profile">&#128125; { username }</NavLink>
            <NavLink className="nav-link" to="/" onClick={ handleLogout }>Sign Out</NavLink>
        </div>
    );

    let guestNav = (
        <div id="guest">
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/login">Sign In</NavLink>
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/register">Sign Up</NavLink>
        </div>
    );

    return (
        <header className="header">
            <Logo/>
            <nav>
                <NavLink className="nav-link" activeClassName="active-nav-link" to="/explore">Explore</NavLink>
                <NavLink className="nav-link" activeClassName="active-nav-link" to="/all-species">All species</NavLink>
                { currentUser !== null ? userNav : guestNav }
            </nav>
        </header>
    );
}

export default Header;