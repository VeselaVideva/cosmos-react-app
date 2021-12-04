import './Auth.css';

import { Link, useHistory } from 'react-router-dom';

import { signIn } from '../../services/authService';


const Login = ({
    history
}) => {
    let historyHook = useHistory();

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email === '' || password === '') {
            throw new Error(`All fields are required!`);
        }

        await signIn(email, password)
            .then((cred) => {
                console.log('User logged in:', cred.user);
                e.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            })

        historyHook.push('/explore');
    };

    return (
        <div className="login">
            <form onSubmit={ onFormSubmit }>
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