import { createContext, useState, useEffect } from 'react';

import {} from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../services/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        return onAuthStateChanged(auth, user => setCurrentUser(user));
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            { children }
        </AuthContext.Provider>
    )
}