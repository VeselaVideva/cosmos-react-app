import './PlanetDetails.css';
import Loading from '../Loading/Loading';
import { useEffect, useState, Suspense } from 'react';
import * as planetService from '../../services/planetService';
import DetailsCard from '../DetailsCard/DetailsCard';

const PlanetDetails = ({
    match
}) => {
    const [planet, setPlanet] = useState([]);

    useEffect(() => {
        planetService.getOne(match.params.planetName)
            .then(result => {
                setPlanet(result);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="explore">
            <Suspense fallback={<Loading />}>
                { planet !== undefined
                    ? planet.filter(x => x !== undefined).map((x) => <DetailsCard key={x.name} planet={x} />)
                    : <Loading />
                }
            </Suspense>
        </div>
    );
}

export default PlanetDetails;
