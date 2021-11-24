import { useState, useEffect } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const auth = getAuth();

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
    return signOut(auth);
}

// Hook for auth state
export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, []);

    return currentUser;
}