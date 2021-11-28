import { Route, Switch, Redirect } from 'react-router-dom';
import './normalize.css';
import './App.css';
import {} from './firebase/config';
import { useAuth } from './services/authService';

// Components
import Background from './components/Background';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Explore from './components/Explore/Explore'; // page showing all planets
import PlanetDetails from './components/PlanetDetails/PlanetDetails';
import Populate from './components/Populate/Populate';
import Profile from './components/Profile/Profile';
import Species from './components/Species/Species';
import PageNotFound from './components/PageNotFound/PageNotFound';
import AuthRouteGuard from './components/Auth/AuthRouteGuard'; // 404 page
import Ownership from './components/Ownership/Ownership';

export default function App() {
    let isAuthenticated = false;

    const currentUser = useAuth();
    console.log(currentUser);

    if (currentUser !== null) {
        isAuthenticated = true;
    }

    return (
        <>
            <Background />
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={ Home } />
                    <Route path="/explore" exact component={ Explore } />
                    <Route path="/explore/:planetName" component={ PlanetDetails } />
                    <Route path="/all-species" component={ Species } />
                    <Route path="/populate">
                        { isAuthenticated ? <Populate /> : <Redirect to="/login" /> }
                    </Route>
                    <Route path="/profile">
                        { isAuthenticated ? <Profile /> : <Redirect to="/login" /> }
                    </Route>
                    <Route path="/login">
                        { !isAuthenticated ? <Login /> : <AuthRouteGuard /> }
                    </Route>
                    <Route path="/register">
                        { !isAuthenticated ? <Register /> : <AuthRouteGuard /> }
                    </Route>
                    <Route path="/*" component={ PageNotFound } />
                </Switch>
                <Ownership />
            </div>
        </>
    );
}