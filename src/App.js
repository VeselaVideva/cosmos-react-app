import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './normalize.css';
import './App.css';

import {} from './firebase/config';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { useAuth } from './hooks/useAuth';

// Components
import Loading from './components/Loading/Loading'; // fallback UI
const Background = lazy(() => import('./components/Background'));
const Header = lazy(() => import('./components/Header/Header'));
const Home = lazy(() => import('./components/Home/Home'));
const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Explore = lazy(() => import('./components/Explore/Explore')); // page showing all planets
const PlanetDetails = lazy(() => import('./components/PlanetDetails/PlanetDetails'));
const Populate = lazy(() => import('./components/Populate/Populate')); // create
const Update = lazy(() => import('./components/Populate/Update'));
const Delete = lazy(() => import('./components/Populate/Delete'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Species = lazy(() => import('./components/Species/Species')); // catalog
const PageNotFound = lazy(() => import('./components/PageNotFound/PageNotFound')); // 404 page
const AuthRouteGuard = lazy(() => import('./components/Auth/AuthRouteGuard'));
const Notification = lazy(() => import('./components/Notification/Notification'));
const ScrollButton = lazy(() => import('./components/ScrollToTop/ScrollToTop'));
const Ownership = lazy(() => import('./components/Ownership/Ownership'));


export default function App() {
    const currentUser = useAuth();

    const isAuth = Boolean(currentUser !== null);

    return (
        <AuthProvider>
            <NotificationProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Background />
                        <div className="App">
                            <Header/>
                            <Notification />
                            <Switch>
                                <Route path="/" exact component={ Home } />
                                <Route path="/explore" exact component={ Explore } />
                                <Route path="/explore/:planetName" component={ PlanetDetails } />
                                <Route path="/all-species" exact component={ Species } />
                                <Route path="/all-species/:speciesId/edit">
                                    { isAuth ? <Update /> : <Redirect to="/login" /> }
                                </Route>
                                <Route path="/all-species/:speciesId/delete">
                                    { isAuth ? <Delete /> : <Redirect to="/login" /> }
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
                            <ScrollButton />
                            <Ownership />
                        </div>
                    </Suspense>
                </BrowserRouter>
            </NotificationProvider>
        </AuthProvider>
    );
}