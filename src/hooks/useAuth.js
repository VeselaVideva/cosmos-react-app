import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../services/authService';


export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        return onAuthStateChanged(auth, user => setCurrentUser(user));
    }, []);

    return currentUser;
}