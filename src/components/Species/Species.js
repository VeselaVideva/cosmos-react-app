import { useEffect, useState, lazy, Suspense } from 'react';
import './Species.css';

import Loading from '../Loading/Loading';

import { getAllSpecies } from '../../services/speciesService';

const SpeciesCard = lazy(() => import('../SpeciesCard/SpeciesCard'));


const Species = () => {
    const [species, setSpecies] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        getAllSpecies()
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                return setError(err.message);
            })
    }, []);

    return (
        <div className="species">
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <Suspense fallback={<Loading />}>
                { species.length > 0
                    ? species.map(x => <SpeciesCard key={x.id} species={x} />)
                    : <Loading />
                }
            </Suspense>
        </div>
    )
}

export default Species;