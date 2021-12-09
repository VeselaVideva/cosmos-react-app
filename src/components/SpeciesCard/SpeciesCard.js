import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SpeciesCard.css';

import { AuthContext } from '../../contexts/AuthContext';
import { likeOne } from '../../services/speciesService';


const SpeciesCard = ({
    species
}) => {
    const { currentUser } = useContext(AuthContext);

    let isOwner = currentUser?.email === species.owner;
    const speciesId = species.id;

    const [hearts, setHearts] = useState([]);
    const [error, setError] = useState([]);

    const likeAction = async () => {
        await likeOne(speciesId, currentUser.email)
            .then(result => {
                setHearts(result);
                return hearts;
            })
            .catch((err) => {
                return setError(err.message);
            })
    }

    const ownerButtons = (
        <div className="owner-buttons">
            <Link to={`/all-species/${species.id}/edit`} className="card-btn">Edit</Link>
            <Link to={`/all-species/${species.id}/delete`} className="card-btn">Delete</Link>
        </div>
    )

    const likes = (
        <div className="card-likes">
            { species.likes?.length > 0
                ? (
                    <>
                        <p className="likes-count">Likes: {species.likes.length}</p>
                        <div className="heart active">&#10084;</div>
                    </>
                )
                : ''
            }
            { !species.likes?.includes(currentUser?.email)
                ? <div className="heart" onClick={ likeAction }>&#10084;</div>
                : ''
            }
        </div>
    )

    return (
        <div className="species-card" key={species.id}>
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <div className="flex">
                <img src={species.image} alt={species.species} />
                <div>
                    <h2><span>Species:</span> {species.species}</h2>
                    <p><span>Planet:</span> {species.planet}</p>
                    <p><span>Lifespan:</span> {species.lifespan} yrs</p>
                    <p><span>Description:</span> {species.description}</p>
                </div>
            </div>
            <div className="card-owner-details">
                <p className="card-owner"><span>Added by:</span> {species.owner}</p>
                    { currentUser !== null && isOwner === true
                        ? ownerButtons
                        : ''
                    }
                    { currentUser !== null && isOwner !== true
                        ? likes
                        : ''
                    }
                    { currentUser === null
                        ? <div className="">Likes: { species.likes?.length || 0 }</div>
                        : ''
                    }
            </div>
        </div>
    );
}

export default SpeciesCard;