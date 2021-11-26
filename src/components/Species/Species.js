import './Species.css';
import Loading from '../Loading/Loading';
import { useEffect, useState, Suspense } from 'react';
import * as speciesService from '../../services/speciesService';
import SpeciesCard from '../SpeciesCard/SpeciesCard';

const Species = ({
    owner
}) => {
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            speciesService.getAllSpecies()
                .then(result => {
                    setSpecies(result);
                    return result;
                })
        }, 1000);
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