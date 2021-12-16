import { useContext } from 'react';

import './Notification.css';
import { NotificationContext } from '../../contexts/NotificationContext';


const Notification = () => {
    const { notification, hideNotification } = useContext(NotificationContext);

    return (
        <div className={`notification ${notification.type}`} onClick={ hideNotification }>
            <p className="notification-message">
                { notification.message }
                { notification.message !== ''
                    ? <span className="notification-close">&#10799;</span>
                    : '' }
            </p>
        </div>
    );
}

export default Notification;