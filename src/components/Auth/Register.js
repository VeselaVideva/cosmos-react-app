import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Auth.css';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import { signUp } from '../../services/authService';


const Register = ({
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

        await signUp(email, password)
            .then((cred) => {
                // console.log('User created:', cred.user);
                showNotification('You signed up successfully!', types.success);
                e.target.reset();
                historyHook.push('/explore');
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    };

    return (
        <div className="register">
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