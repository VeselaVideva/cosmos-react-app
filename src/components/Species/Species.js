import './Species.css';

import { useEffect, useState, Suspense } from 'react';

import Loading from '../Loading/Loading';
import SpeciesCard from '../SpeciesCard/SpeciesCard';

import { getAllSpecies } from '../../services/speciesService';


const Species = ({
    owner
}) => {
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        getAllSpecies()
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    return (
        <div className="species">
            <Suspense fallback={<Loading />}>
                { species.length > 0
                    ? species.map(x => <SpeciesCard key={x.id} species={x} owner={owner} />)
                    : <Loading />
                }
            </Suspense>
        </div>
    )
}

export default Species;