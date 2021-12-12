import { useEffect, useState, lazy, Suspense } from 'react';
import './Explore.css';

import Loading from '../Loading/Loading';

import { getAll } from '../../services/planetService';

const PlanetCard = lazy(() => import('../Card/PlanetCard'));


const Explore = () => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        getAll()
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