import './Explore.css';

import { useEffect, useState, Suspense } from 'react';

import Loading from '../Loading/Loading';
import PlanetCard from '../Card/PlanetCard';

import * as planetService from '../../services/planetService';


const Explore = () => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        planetService.getAll()
            .then(result => {
                setPlanets(result);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    return (
        <div className="explore">
            <Suspense fallback={<Loading />}>
                { planets.length > 0
                    ? planets.map(x => <PlanetCard key={x.name} planet={x} />)
                    : <Loading />
                }
            </Suspense>
        </div>
    );
}

export default Explore;