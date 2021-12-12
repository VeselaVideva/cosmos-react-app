import { useContext } from 'react';
import './Notification.css';

import { NotificationContext } from '../../contexts/NotificationContext';


const Notification = () => {
    const { notification, hideNotification } = useContext(NotificationContext);

    return (
        <div className={`notification ${notification.type}`} onClick={ hideNotification }>
            <p className="notification-message">
                { notification.message }
            </p>
        </div>
    );
}

export default Notification;