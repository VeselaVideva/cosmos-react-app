import './Auth.css';

const Register = () => {
    return (
        <div className="register">
            <form>
                <h1>Sign up</h1>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input className="" type="submit" value="Sign up"/>
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </form>
        </div>
    );
}

export default Register;