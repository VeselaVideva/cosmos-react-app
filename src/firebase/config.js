import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoCcBDQ0GCEne1NeiJZc9wLOHO359s8RA",
    authDomain: "cosmos-react-app.firebaseapp.com",
    projectId: "cosmos-react-app",
    storageBucket: "cosmos-react-app.appspot.com",
    messagingSenderId: "812120887402",
    appId: "1:812120887402:web:8b8478c5b10fb4eef7fa13"
};

// Init Firebase app
initializeApp(firebaseConfig);

const auth = getAuth();

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user !== null) {
        console.log('Logged in!'); // TODO:
    } else {
        console.log('No user!'); // TODO:
    }
});