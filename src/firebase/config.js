import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Init services
const db = getFirestore(); // Cloud Firestore location: eur3 (europe-west)

// Collection ref
const planetsCol = collection(db, 'planets');

// Get all planets from my database (collection data)
getDocs(planetsCol)
    .then((snapshot) => {
        let planets = [];
        snapshot.docs.forEach((doc) => {
            planets.push({ ...doc.data(), id: doc.id });
        });
        console.log(planets); // TODO:
    })
    .catch(err => {
        console.log(err.message);
    });

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user !== null) {
        console.log('Logged in!'); // TODO:
    } else {
        console.log('No user!'); // TODO:
    }
});