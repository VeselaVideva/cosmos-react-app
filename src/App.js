import { Route, Switch } from 'react-router-dom';
import './normalize.css';
import './App.css';
import {} from './firebase/config';

// Components
import Background from './components/Background';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Explore from './components/Explore/Explore'; // page showing all planets
import PlanetDetails from './components/PlanetDetails/PlanetDetails';
import Populate from './components/Populate/Populate';
import Species from './components/Species/Species';
import PageNotFound from './components/PageNotFound/PageNotFound'; // 404 page

export default function App() {
    return (
        <>
            <Background />
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/explore" exact component={Explore} />
                    <Route path="/explore/:planetName" component={PlanetDetails} />
                    <Route path="/all-species" component={Species} />
                    <Route path="/populate" exact component={Populate} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/*" component={PageNotFound} />
                </Switch>
            </div>
        </>
    );
}