import './PlanetCard.css';

import { Link } from 'react-router-dom';


const PlanetCard = ({
    planet
}) => {
    return (
        <div className="planet-card" key={planet.name}>
            <img src={planet.image} alt={planet.name} />
            <h2>{planet.name}</h2>
            <Link to={`/explore/${planet.name}`} className="card-btn">Details</Link>
        </div>
    );
}

export default PlanetCard;