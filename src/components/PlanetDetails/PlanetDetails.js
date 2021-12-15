import { useEffect, useState, useContext, lazy, Suspense } from 'react';
import './PlanetDetails.css';

import Loading from '../Loading/Loading';

import { types, NotificationContext } from '../../contexts/NotificationContext';
import { getOne } from '../../services/planetService';
import { getPlanetSpecies } from '../../services/speciesService';

const DetailsCard = lazy(() => import('../DetailsCard/DetailsCard'));
const SpeciesCard = lazy(() => import('../SpeciesCard/SpeciesCard'));


const PlanetDetails = ({
    match
}) => {
    const { showNotification } = useContext(NotificationContext);

    const [planet, setPlanet] = useState([]);

    useEffect(() => {
        getOne(match.params.planetName)
            .then(result => {
                setPlanet(result);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }, [match, showNotification]);

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        getPlanetSpecies(match.params.planetName)
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }, [match, showNotification]);

    return (
        <div className="explore">
            <Suspense fallback={<Loading />}>
                { planet !== undefined
                    ? planet.filter(x => x !== undefined).map((x) =>
                        <DetailsCard key={x.name} planet={x} />
                    )
                    : <Loading />
                }
            </Suspense>
            <Suspense fallback={<Loading />}>
                <h2>Inhabitants</h2>
                { species.length > 0
                    ? species.map(x => <SpeciesCard key={x.id} species={x} />)
                    : (
                        <div className="planet-card-details">
                            <h2>This planet still has no inhabitants!</h2>
                        </div>
                    )
                }
            </Suspense>
        </div>
    );
}

export default PlanetDetails;
