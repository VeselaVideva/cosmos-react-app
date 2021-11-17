import { useState } from 'react';
import './normalize.css';
import './App.css';
import {} from './firebase/config';

// Components
import Background from './components/Background';
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Explore from './components/Explore/Explore'; // page showing all destinations (planets)

export default function App() {
    const [page, setPage] = useState('/');

    const navigationChangeHandler = (path) => {
        setPage(path);
    }

    const router = (path) => {
        let pathNames = path.split('/');

        let rootPath = pathNames[1];
        let argument = pathNames[2]; // for each planet details

        const routes = {
            'login': <Login />,
            'register': <Register />,
            'explore': <Explore />,
        };

        return routes[rootPath];
    }

    return (
        <>
            <Background />
            <div className="App">
                <Header navigationChangeHandler={navigationChangeHandler} />
                { router(page) || '' }
            </div>
        </>
    );
}