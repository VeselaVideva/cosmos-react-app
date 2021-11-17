import './Auth.css';

const Login = () => {
    return (
        <div className="login">
            <form>
                <h1>Sign in</h1>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input className="" type="submit" value="Sign in"/>
                <p>Don't have an account? <a href="/register">Sign up</a></p>
            </form>
        </div>
    );
}

export default Login;