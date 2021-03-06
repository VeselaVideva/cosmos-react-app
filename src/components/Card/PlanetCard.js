import { Link } from 'react-router-dom';

import './PlanetCard.css';


const PlanetCard = ({
    planet
}) => {
    return (
        <div className="planet-card" key={planet.name}>
            <img src={planet.image} alt={planet.name} />
            <h2>{planet.name}</h2>
            <Link to={`/explore/${planet.name}`} className="card-btn">
                <span aria-hidden="true" className="circle">
                    <span className="icon arrow" />
                </span>
                <span className="button-text">Details</span>
            </Link>
        </div>
    );
}

export default PlanetCard;