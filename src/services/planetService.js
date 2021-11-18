import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

// Get all planets from my database (collection data)
export async function getAll() {
    const snapshot = await getDocs(collection(db, "planets"));
    return snapshot.docs.map((doc) => {
        return doc.data();
    });
}

// Get only one planet
export async function getOne(planetName) {
    const snapshot = await getDocs(collection(db, "planets"));
    return snapshot.docs.map((doc) => {
        if (doc.data().name === planetName) {
            return doc.data();
        }
    });
}