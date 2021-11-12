import './Header.css';
import Logo from '../Logo/Logo';

export default function Header() {
    return (
        <div className="header">
            {/* TODO: add menu items */}
            <Logo />
            <p>COSMOS app in progress...</p>
        </div>
    );
}