import './Auth.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = ({
    history
}) => {
    let historyHook = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        // TODO: Login
        historyHook.push('/');
    };

    return (
        <div className="login">
            <form onSubmit={onFormSubmit}>
                <h1>Sign In</h1>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <input className="submit" type="submit" value="Sign in"/>
                <p>Don't have an account? <Link className="internal-link" to="/register">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Login;