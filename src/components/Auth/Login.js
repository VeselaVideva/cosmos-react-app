import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Auth.css';

import { signIn } from '../../services/authService';


const Login = ({
    history
}) => {
    let historyHook = useHistory();

    const [error, setError] = useState([]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email === '' || password === '') {
            return setError('All fields are required!');
        }

        await signIn(email, password)
            .then((cred) => {
                console.log('User logged in:', cred.user);
                e.target.reset();
                historyHook.push('/explore');
            })
            .catch((err) => {
                return setError(err.message);
            })
    };

    return (
        <div className="login">
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <form onSubmit={ onFormSubmit } autoComplete="off">
                <h1>Sign In</h1>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input className="submit" type="submit" value="Sign in"/>
                <p>Don't have an account? <Link className="internal-link" to="/register">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Login;