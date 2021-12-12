import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Auth.css';

import { types, NotificationContext } from '../../contexts/NotificationContext';

import { signUp } from '../../services/authService';


const Register = ({
    history
}) => {
    let historyHook = useHistory();

    const [error, setError] = useState([]);
    const { showNotification } = useContext(NotificationContext);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email === '' || password === '') {
            return setError('All fields are required!');
        }

        await signUp(email, password)
            .then((cred) => {
                // console.log('User created:', cred.user);
                showNotification('You signed up successfully!', types.success);
                e.target.reset();
                historyHook.push('/explore');
            })
            .catch((err) => {
                return setError(err.message);
            })
    };

    return (
        <div className="register">
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <form onSubmit={ onFormSubmit } autoComplete="off">
                <h1>Sign Up</h1>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <input className="submit" type="submit" value="Sign up"/>
                <p>Already have an account? <Link className="internal-link" to="/login">Sign In</Link></p>
            </form>
        </div>
    );
}

export default Register;