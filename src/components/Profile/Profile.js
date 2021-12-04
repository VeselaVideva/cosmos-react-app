import './Profile.css';

import { useContext, useEffect, useState, Suspense } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import Loading from '../Loading/Loading';
import SpeciesCard from '../SpeciesCard/SpeciesCard';

import * as speciesService from '../../services/speciesService';


const Profile = () => {
    const { currentUser } = useContext(AuthContext);

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        speciesService.getUserSpecies(currentUser?.email)
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [currentUser]);

    return (
        <div className="profile">
            <div className="user-info">
                <h2><span>User:</span> {currentUser?.email}</h2>
            </div>
            <div className="my-species">
                <h2>My Species</h2>
                <Suspense fallback={<Loading />}>
                    { species.length > 0
                        ? species.map(x => <SpeciesCard key={x.id} species={x} />)
                        : (
                            <div className="user-info">
                                <h2>You don't have any species!</h2>
                            </div>
                        )
                    }
                </Suspense>
            </div>
        </div>
    )
}

export default Profile;