import { useEffect, useState, Suspense } from 'react';
import './PlanetDetails.css';

import Loading from '../Loading/Loading';
import DetailsCard from '../DetailsCard/DetailsCard';
import SpeciesCard from '../SpeciesCard/SpeciesCard';

import { getOne } from '../../services/planetService';
import { getPlanetSpecies } from '../../services/speciesService';


const PlanetDetails = ({
    match
}) => {
    const [planet, setPlanet] = useState([]);

    useEffect(() => {
        getOne(match.params.planetName)
            .then(result => {
                setPlanet(result);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [match]);

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        getPlanetSpecies(match.params.planetName)
            .then(result => {
                setSpecies(result);
            })
    }, [match]);

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
