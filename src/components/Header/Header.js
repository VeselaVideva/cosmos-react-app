import './Header.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { auth } from '../../services/authService';
import { signOut } from 'firebase/auth';

const Header = ({
    history
}) => {
    let historyHook = useHistory();

    const logout = (e) => {
        e.preventDefault();

        signOut(auth).then(() => {
            auth.currentUser = null;
            console.log('Logged out!');
        }).catch((err) => {
            console.log(err.message);
        });

        historyHook.push('/');
    }

    console.log(auth.currentUser);

    let userNav = (
        <div id="user">
            <span className="nav-link">Welcome, { auth.currentUser !== null
                ? auth.currentUser.email.charAt(0).toUpperCase() + auth.currentUser.email.slice(1).split('@')[0]
                : '' }</span>
            <NavLink className="nav-link" to="/" onClick={logout}>Sign Out</NavLink>
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
                { auth.currentUser !== null ? userNav : guestNav }
            </nav>
        </header>
    );
}

export default Header;