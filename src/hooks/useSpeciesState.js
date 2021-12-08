import { useState, useEffect } from 'react';

import { getOne } from '../services/speciesService';


const useSpeciesState = (speciesId) => {
    const [species, setSpecies] = useState({});

    useEffect(() => {
        getOne(speciesId)
            .then(result => {
                setSpecies(result);
            })
    }, [speciesId]);

    return [
        species,
        setSpecies
    ]
};

export default useSpeciesState;