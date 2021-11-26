import './DetailsCard.css';
import Loading from '../Loading/Loading';
import { Suspense } from 'react';

const DetailsCard = ({
    planet
}) => {
    return (
        <div className="planet-card-details" key={planet.name}>
            <div className="card-grid">
                <div>
                    <img src={planet.image} alt={planet.name}/>
                </div>
                <div>
                    <h2><span>Name:</span> {planet.name}</h2>
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
            <Suspense fallback={<Loading />}>
                <iframe
                    title={planet.name}
                    width="100%"
                    height="700px"
                    src={`https://solarsystem.nasa.gov/planets/${planet.name.toLowerCase()}/overview/`}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen>
                </iframe>
            </Suspense>
        </div>
    );
}

export default DetailsCard;