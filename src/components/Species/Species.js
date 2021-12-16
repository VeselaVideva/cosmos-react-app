import { useEffect, useState, useContext, lazy, Suspense } from 'react';

import './Species.css';
import Loading from '../Loading/Loading';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import { getAllSpecies } from '../../services/speciesService';

const SpeciesCard = lazy(() => import('../SpeciesCard/SpeciesCard'));


const Species = () => {
    const [species, setSpecies] = useState([]);

    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        getAllSpecies()
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }, [showNotification]);

    return (
        <div className="species">
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