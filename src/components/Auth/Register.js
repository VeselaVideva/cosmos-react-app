import './Auth.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Register = ({
    history
}) => {
    let historyHook = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();
        // TODO: Register
        historyHook.push('/login');
    };

    return (
        <div className="register">
            <form onSubmit={onFormSubmit}>
                <h1>Sign Up</h1>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirm-password" placeholder="Confirm Password" required />
                <input className="submit" type="submit" value="Sign up"/>
                <p>Already have an account? <Link className="internal-link" to="/login">Sign In</Link></p>
            </form>
        </div>
    );
}

export default Register;