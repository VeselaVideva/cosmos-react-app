import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Populate.css';

import { AuthContext } from '../../contexts/AuthContext';

import { addNew } from '../../services/speciesService';


const Populate = ({
    history
}) => {
    let historyHook = useHistory();

    const [error, setError] = useState([]);

    const { currentUser } = useContext(AuthContext);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const species = formData.get('species').trim();
        const lifespan = formData.get('lifespan').trim();
        const image = formData.get('image').trim();
        const description = formData.get('description').trim();
        const planet = formData.get('planet').trim();
        const owner = currentUser.email;

        if (species === '' || lifespan === '' || image === '' || description === '' || planet === null) {
            return setError('All fields are required!');
        }

        await addNew({ species, lifespan, image, description, planet, owner })
            .then(() => {
                e.target.reset();
                historyHook.push('/all-species');
                return owner;
            })
            .catch((err) => {
                return setError(err.message);
            })
    }

    return (
        <div className="populate">
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <form onSubmit={ onFormSubmit }>
                <h1>Add new species</h1>
                <label htmlFor="species">Species name:</label>
                <input type="text" name="species" placeholder="Species name" />
                <label htmlFor="lifespan">Lifespan:</label>
                <input type="number" name="lifespan" placeholder="Lifespan" />
                <label htmlFor="image">Image:</label>
                <input type="url" name="image" placeholder="https://" />
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" placeholder="Description" />
                <label htmlFor="planet">Planet:</label>
                <select name="planet">
                    <option value="Mercury">Mercury</option>
                    <option value="Venus">Venus</option>
                    <option value="Earth">Earth</option>
                    <option value="Mars">Mars</option>
                    <option value="Jupiter">Jupiter</option>
                    <option value="Saturn">Saturn</option>
                    <option value="Uranus">Uranus</option>
                    <option value="Neptune">Neptune</option>
                    <option value="Pluto">Pluto</option>
                </select>
                <input className="submit" type="submit" value="Add new species"/>
            </form>
        </div>
    )
}

export default Populate;