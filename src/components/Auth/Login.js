import './Auth.css';

const Login = () => {
    return (
        <div className="login">
            <form>
                <h1>Sign In</h1>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <input className="submit" type="submit" value="Sign in"/>
                <p>Don't have an account? <a className="internal-link" href="/register">Sign Up</a></p>
            </form>
        </div>
    );
}

export default Login;