import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "firebase/firestore";

const db = getFirestore();

// Get all species from database
export async function addNew({ species, lifespan, image, description, planet, owner }) {
    const docRef = await addDoc(collection(db, "species"), {
        species,
        lifespan,
        image,
        description,
        planet,
        owner
    });
    return docRef;
}

// Get all species from database
export async function getAllSpecies() {
    const snapshot = await getDocs(collection(db, "species"));
    return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}

// Get species for a specific planet
export async function getPlanetSpecies(planetName) {
    const snapshot = await getDocs(collection(db, "species"));
    return snapshot.docs.filter(doc => doc.data().planet === planetName).map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}