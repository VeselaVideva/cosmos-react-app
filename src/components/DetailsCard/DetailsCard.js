import './DetailsCard.css';

const DetailsCard = ({
    planet
}) => {
    return (
        <div className="planet-card-details" key={planet.name}>
            <img src={planet.image} alt={planet.name}/>
            <h2><span>Name:</span> {planet.name}</h2>
            <div className="card-grid">
                <div>
                    <p><span>Mass:</span> {planet.mass} x 10<sup>24</sup>kg</p>
                    <p><span>Diameter:</span> {planet.diameter}km</p>
                    <p><span>Gravity:</span> {planet.gravity}m/s<sup>2</sup></p>
                    <p><span>Temperature:</span> {planet.temperature}°C</p>
                    <p><span>Moons:</span> {planet.moons}</p>
                </div>
                <div>
                    <p><span>Description:</span> {planet.description}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailsCard;