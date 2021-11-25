import './Header.css';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useAuth, logOut } from '../../services/authService';
import { getUsername } from '../../utils/getUsername';

const Header = ({
    history
}) => {
    let historyHook = useHistory();

    const currentUser = useAuth();
    const username = getUsername(currentUser);

    const handleLogout = async (e) => {
        e.preventDefault();

        await logOut().then(() => {
            console.log('Logged out!');
        }).catch((err) => {
            console.log(err.message);
        });

        historyHook.push('/');
    }

    let userNav = (
        <div id="user">
            <NavLink className="nav-link" activeClassName="active-nav-link" to="/populate">Populate</NavLink>
            <span className="nav-link">Welcome, { username }</span>
            <NavLink className="nav-link" to="/" onClick={handleLogout}>Sign Out</NavLink>
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