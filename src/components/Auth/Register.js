import './Auth.css';

const Register = () => {
    return (
        <div className="register">
            <form>
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="youremail@abv.bg"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password"/>
                <label htmlFor="repass">Repeat Password:</label>
                <input type="password" name="repass"/>
                <input className="" type="submit" value="Register"/>
                <p>If you already have a profile click <a href="/login">here</a></p>
            </form>
        </div>
    );
}

export default Register;