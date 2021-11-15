import './Header.css';
import Logo from '../Logo/Logo';

const Header = ({ navigationChangeHandler }) => {
    const onHeaderClick = (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            let url = new URL(e.target.href);
            navigationChangeHandler(url.pathname)
        }
    };

    return (
        <header className="header" onClick={onHeaderClick}>
            <Logo/>
            <nav>
                <a className="nav-link" href="login">Login</a>
                <a className="nav-link" href="register">Register</a>
            </nav>
        </header>
    );
}

export default Header;