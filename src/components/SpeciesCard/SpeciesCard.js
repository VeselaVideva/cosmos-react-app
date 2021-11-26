import './SpeciesCard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/authService';

const SpeciesCard = ({
    species
}) => {
    const currentUser = useAuth();
    let isOwner = currentUser?.email === species.owner;

    return (
        <div className="species-card" key={species.id}>
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
                            ? (
                                <div>
                                    <Link to={`/all-species/${species.id}/edit`} className="card-btn">Edit</Link>
                                    <Link to={`/all-species/${species.id}/delete`} className="card-btn">Delete</Link>
                                </div>
                            )
                            : '' }
                </div>
        </div>
    );
}

export default SpeciesCard;