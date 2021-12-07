import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Populate.css';

import { getOne, updateOne } from '../../services/speciesService';


const Update = ({
    history
}) => {
    let historyHook = useHistory();

    const match = useParams();
    const speciesId = match.speciesId;

    const [species, setSpecies] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        getOne(speciesId)
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                return setError(err.message);
            })
    }, [speciesId]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const species = formData.get('species');
        const lifespan = formData.get('lifespan');
        const image = formData.get('image');
        const description = formData.get('description');

        if (species === '' || lifespan === '' || image === '' || description === '') {
            return setError('All fields are required!');
        }

        await updateOne(speciesId, { species, lifespan, image, description })
            .then(() => {
                e.target.reset();
                historyHook.push('/all-species');
            })
            .catch((err) => {
                return setError(err.message);
            })
    }

    return (
        <div className="populate">
            { error.length > 0 ? <div className="error-box">{ error }</div> : '' }
            <form method="POST" onSubmit={ onFormSubmit }>
                <h1>Update <span className="accent">{species.species}</span> info</h1>
                <label htmlFor="species">Species name:</label>
                <input type="text" name="species" placeholder={species.species} />
                <label htmlFor="lifespan">Lifespan:</label>
                <input type="number" name="lifespan" placeholder={species.lifespan} />
                <label htmlFor="image">Image:</label>
                <input type="url" name="image" placeholder={species.image} />
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" placeholder={species.description} />
                <input className="submit" type="submit" value="Update species"/>
            </form>
        </div>
    )
}

export default Update;