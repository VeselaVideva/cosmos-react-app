import './Auth.css';

const Login = () => {
    return (
        <div className="login">
            <form>
                <h1>Login</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="youremail@abv.bg"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password"/>
                <input className="" type="submit" value="Login"/>
                <p>If you don't have a profile, click <a href="/register">here</a></p>
            </form>
        </div>
    );
}

export default Login;