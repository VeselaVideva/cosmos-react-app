import './Auth.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { auth } from '../../services/authService';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({
    history
}) => {
    let historyHook = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email === '' || password === '') {
            throw new Error(`All fields are required!`);
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log('User created:', cred.user);
                e.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            })

        historyHook.push('/explore');
    };

    return (
        <div className="register">
            <form onSubmit={onFormSubmit}>
                <h1>Sign Up</h1>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input className="submit" type="submit" value="Sign up"/>
                <p>Already have an account? <Link className="internal-link" to="/login">Sign In</Link></p>
            </form>
        </div>
    );
}

export default Register;