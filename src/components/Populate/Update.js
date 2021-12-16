import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './Populate.css';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import { updateOne } from '../../services/speciesService';
import { planets } from '../../utils/planetsList';
import useSpeciesState from '../../hooks/useSpeciesState';


const Update = ({
    history
}) => {
    let historyHook = useHistory();

    const { speciesId } = useParams();

    const [species, setSpecies] = useSpeciesState(speciesId);
    const { showNotification } = useContext(NotificationContext);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const species = formData.get('species');
        const lifespan = formData.get('lifespan');
        const image = formData.get('image');
        const description = formData.get('description');
        const planet = formData.get('planet');

        if (species === '' || lifespan === '' || image === '' || description === '') {
            return showNotification('All fields are required!', types.warning);
        }

        await updateOne(speciesId, { species, lifespan, image, description, planet })
            .then(() => {
                showNotification('You successfully update the species info!', types.success);
                e.target.reset();
                historyHook.push('/all-species');
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }

    return (
        <div className="populate">
            <form onSubmit={ onFormSubmit } autoComplete="off">
                <h1>Update <span className="accent">{species.species}</span> info</h1>
                <label htmlFor="species">Species name:</label>
                <input type="text" name="species" defaultValue={species.species} />
                <label htmlFor="lifespan">Lifespan:</label>
                <input type="number" name="lifespan" defaultValue={species.lifespan} />
                <label htmlFor="image">Image:</label>
                <input type="url" name="image" defaultValue={species.image} />
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" defaultValue={species.description} />
                <label htmlFor="planet">Planet:</label>
                <select name="planet"
                        value={species.planet}
                        onChange={ (e) => setSpecies(s => ({ ...s, planet: e.target.value })) }
                >
                    { planets.map(x => <option key={x.value} value={x.value}>{x.name}</option>) }
                </select>
                <input className="submit" type="submit" value="Update species"/>
            </form>
        </div>
    )
}

export default Update;