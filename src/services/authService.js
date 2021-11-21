import {getAuth, onAuthStateChanged } from 'firebase/auth';

export const auth = getAuth();

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user !== null) {
        console.log('Logged in! User: ' + user.email);
    } else {
        console.log('No user!');
    }
});