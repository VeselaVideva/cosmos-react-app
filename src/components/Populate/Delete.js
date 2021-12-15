import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Populate.css';

import { types, NotificationContext } from '../../contexts/NotificationContext';

import { getOne, deleteOne } from '../../services/speciesService';


const Delete = ({
    history
}) => {
    let historyHook = useHistory();

    const match = useParams();
    const speciesId = match.speciesId;

    const [species, setSpecies] = useState([]);
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        getOne(speciesId)
            .then(result => {
                setSpecies(result);
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }, [speciesId, showNotification]);

    const deleteHandler = () => {
        deleteOne(speciesId)
            .then(result => {
                setSpecies(result);
                showNotification('You successfully deleted the species!', types.success);
                historyHook.push('/all-species');
            })
            .catch((err) => {
                return showNotification(err.message, types.error);
            })
    }

    return (
        <div className="populate">
            <div className="flex">
                <h2>Are you sure you want to destroy all <span className="accent">{species?.species}</span>'s?</h2>
                <h2><span>&#9888;</span> This action is irreversible!</h2>
                <img className="crying-alien" src="https://pyxis.nymag.com/v1/imgs/fc7/90e/5120d18b22947134a593434c91c7e656c0-28-crying-alien.rsocial.w1200.jpg" alt="Sad alien" />
                <div className="buttons-block">
                    <div className="confirm-btn alert-btn" onClick={ deleteHandler }>Confirm</div>
                    <div className="confirm-btn" onClick={ historyHook.goBack }>Go Back</div>
                </div>
            </div>
        </div>
    )
}

export default Delete;