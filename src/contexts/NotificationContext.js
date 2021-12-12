import { createContext, useState, useCallback } from 'react';


export const NotificationContext = createContext();

export const types = {
    error: 'error',
    warning: 'warning',
    success: 'success',
    info: 'info'
}

const initialNotificationState = {
    show: false,
    message: '',
    type: ''
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(initialNotificationState);

    const showNotification = useCallback((message, type) => {
        setNotification({ show: true, message, type });

        setTimeout(() => {
            setNotification(initialNotificationState);
        }, 5000);
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(initialNotificationState);
    }, []);

    return (
        <NotificationContext.Provider
            value={{ notification, showNotification, hideNotification }}>
            { children }
        </NotificationContext.Provider>
    )
}