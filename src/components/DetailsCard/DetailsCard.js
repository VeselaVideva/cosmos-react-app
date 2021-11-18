import './DetailsCard.css';
import { Link } from 'react-router-dom';

const DetailsCard = ({
    planet
}) => {
    return (
        <div className="planet-card-details" key={planet.name}>
            <img src={planet.image} alt={planet.name}/>
                <h2>Name: {planet.name}</h2>
            <div className="card-grid">
                <div>
                    <p>Mass: {planet.mass} x 10<sup>24</sup>kg</p>
                    <p>Diameter: {planet.diameter}km</p>
                    <p>Gravity: {planet.gravity}m/s<sup>2</sup></p>
                    <p>Temperature: {planet.temperature}°C</p>
                    <p>Moons: {planet.moons}</p>
                </div>
                <div>
                    <p>Description: {planet.description}</p>
                </div>
            </div>
                <Link to={`/visit/${planet.name}`} className="card-btn">Visit</Link>
        </div>
    );
}

export default DetailsCard;