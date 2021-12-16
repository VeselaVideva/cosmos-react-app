import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './Populate.css';
import { AuthContext } from '../../contexts/AuthContext';
import { types, NotificationContext } from '../../contexts/NotificationContext';
import { addNew } from '../../services/speciesService';
import { planets } from '../../utils/planetsList';


const Populate = ({
    history
}) => {
    let historyHook = useHistory();

    const { currentUser } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);

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
            return showNotification('All fields are required!', types.warning);
        }

        await addNew({ species, lifespan, image, description, planet, owner })
            .then(() => {
                showNotification('You successfully added a new species!', types.success);
                e.target.reset();
                historyHook.push('/all-species');
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }

    return (
        <div className="populate">
            <form method="POST" onSubmit={ onFormSubmit } autoComplete="off">
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
                    { planets.map(x => <option key={x.value} value={x.value}>{x.name}</option>) }
                </select>
                <input className="submit" type="submit" value="Add new species"/>
            </form>
        </div>
    )
}

export default Populate;