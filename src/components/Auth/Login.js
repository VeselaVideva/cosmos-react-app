import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Auth.css';

import { types, NotificationContext } from '../../contexts/NotificationContext';

import { signIn } from '../../services/authService';


const Login = ({
    history
}) => {
    let historyHook = useHistory();

    const { showNotification } = useContext(NotificationContext);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email === '' || password === '') {
            return showNotification('All fields are required!', types.warning);
        }

        await signIn(email, password)
            .then((cred) => {
                // console.log('User logged in:', cred.user);
                showNotification('You logged in successfully!', types.success);
                e.target.reset();
                historyHook.push('/explore');
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    };

    return (
        <div className="login">
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