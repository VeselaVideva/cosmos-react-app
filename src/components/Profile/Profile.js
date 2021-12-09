import { useContext, useEffect, useState, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import './Profile.css';

import { AuthContext } from '../../contexts/AuthContext';

import Loading from '../Loading/Loading';
import SpeciesCard from '../SpeciesCard/SpeciesCard';

import { getUserSpecies } from '../../services/speciesService';
import { addUserInfo } from '../../services/authService';


const Profile = ({
    history
}) => {
    let historyHook = useHistory();

    const { currentUser } = useContext(AuthContext);

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        getUserSpecies(currentUser?.email)
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [currentUser]);

    const [error, setError] = useState([]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const displayName = formData.get('displayName').trim();
        const photoURL = formData.get('photoURL').trim();

        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        const isValid = regex.test(photoURL);

        if (photoURL === '' || isValid === false) {
            return setError('Please put a valid URL with your photo!');
        }

        if (displayName === '') {
            return setError('Please fill your display name!');
        }

        await addUserInfo(displayName, photoURL)
            .then(() => {
                e.target.reset();
                historyHook.push('/all-species');
            })
            .catch((err) => {
                return setError(err.message);
            })
    }

    return (
        <div className="profile">
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <div className="user-info">
                <form onSubmit={ onFormSubmit } autoComplete="off">
                    <div className="user-info_image">
                        { currentUser?.photoURL
                            ? <img src={currentUser?.photoURL} alt={currentUser?.displayName} />
                            : (
                                <>
                                    <img src="/no-image.jpg" alt="" />
                                    <input type="photoURL" name="photoURL" placeholder="Fill your profile photo URL" />
                                </>
                            )
                        }
                    </div>
                    <div className="user-info_data">
                        <h2><span>Name: </span>
                            { currentUser?.displayName || <input type="displayName" name="displayName" placeholder="Fill your display name" /> }
                        </h2>
                        <h2><span>Email: </span> {currentUser?.email}</h2>
                    </div>
                        { !currentUser?.photoURL || !currentUser?.displayName
                            ? <input className="submit" type="submit" value="Update profile"/>
                            : ''
                        }
                </form>
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