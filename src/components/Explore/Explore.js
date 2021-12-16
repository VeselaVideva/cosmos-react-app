import { useEffect, useState, useContext, lazy, Suspense } from 'react';

import './Explore.css';
import Loading from '../Loading/Loading';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import { getAll } from '../../services/planetService';

const PlanetCard = lazy(() => import('../Card/PlanetCard'));


const Explore = () => {
    const [planets, setPlanets] = useState([]);

    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        getAll()
            .then(result => {
                setPlanets(result);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }, [showNotification]);

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