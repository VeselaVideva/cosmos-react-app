const AuthRouteGuard = () => {
    return (
        <div className="route-guard">
            <h2>You're already logged in, stupid!</h2>
            <img className="alien" src="/alien.png" alt="Angry alien" />
        </div>
    )
}

export default AuthRouteGuard;