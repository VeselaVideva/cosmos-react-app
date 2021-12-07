import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './normalize.css';
import './App.css';

import {} from './firebase/config';

import { AuthProvider } from './contexts/AuthContext';

import { useAuth } from './services/authService';

// Components
import Background from './components/Background';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Explore from './components/Explore/Explore'; // page showing all planets
import PlanetDetails from './components/PlanetDetails/PlanetDetails';
import Populate from './components/Populate/Populate'; // create
import Update from './components/Populate/Update';
import Profile from './components/Profile/Profile';
import Species from './components/Species/Species'; // catalog
import PageNotFound from './components/PageNotFound/PageNotFound'; // 404 page
import AuthRouteGuard from './components/Auth/AuthRouteGuard';
import Ownership from './components/Ownership/Ownership';


export default function App() {
    const currentUser = useAuth();

    const isAuth = Boolean(currentUser !== null);

    return (
        <AuthProvider>
            <BrowserRouter>
                <Background />
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={ Home } />
                        <Route path="/explore" exact component={ Explore } />
                        <Route path="/explore/:planetName" component={ PlanetDetails } />
                        <Route path="/all-species" exact component={ Species } />
                        <Route path="/all-species/:speciesId/edit">
                            { isAuth ? <Update /> : <Redirect to="/login" /> }
                        </Route>
                        <Route path="/populate">
                            { isAuth ? <Populate /> : <Redirect to="/login" /> }
                        </Route>
                        <Route path="/profile">
                            { isAuth ? <Profile /> : <Redirect to="/login" /> }
                        </Route>
                        <Route path="/login">
                            { !isAuth ? <Login /> : <AuthRouteGuard /> }
                        </Route>
                        <Route path="/register">
                            { !isAuth ? <Register /> : <AuthRouteGuard /> }
                        </Route>
                        <Route path="/*" component={ PageNotFound } />
                    </Switch>
                    <Ownership />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}