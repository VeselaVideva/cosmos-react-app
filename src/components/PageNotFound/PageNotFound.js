import { Link } from 'react-router-dom';
import './PageNotFound.css';


const PageNotFound = () => {
    return (
        <div className="error-page">
            <h1 className="huge-text">404</h1>
            <h1 className="large-text">Page Not Found</h1>
            <p>Ooops, sorry but you've entered into a Black Hole!</p>
            <p>The gravity is so strong that it can kills you, you must act fast and go <Link to="/" className="internal-link">Home</Link></p>
        </div>
    );
}

export default PageNotFound;