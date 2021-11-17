import './Auth.css';

const Register = () => {
    return (
        <div className="register">
            <form>
                <h1>Sign Up</h1>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input className="submit" type="submit" value="Sign up"/>
                <p>Already have an account? <a className="internal-link" href="/login">Sign In</a></p>
            </form>
        </div>
    );
}

export default Register;