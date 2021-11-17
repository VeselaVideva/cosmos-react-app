import { Route, Switch, Redirect } from 'react-router-dom';
import './normalize.css';
import './App.css';
import {} from './firebase/config';

// Components
import Background from './components/Background';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Explore from './components/Explore/Explore'; // page showing all destinations (planets)
import PageNotFound from './components/PageNotFound/PageNotFound';

export default function App() {
    return (
        <>
            <Background />
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/explore" exact component={Explore} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/logout" render={(props) => {
                        console.log('Logged Out!!!');
                        return <Redirect to="/" />
                    }} />
                    <Route path="/*" component={PageNotFound} />
                </Switch>
            </div>
        </>
    );
}