import {
    getFirestore,
    doc,
    collection,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    arrayUnion
} from "firebase/firestore";


const db = getFirestore();

// Get all species
export async function getAllSpecies() {
    const snapshot = await getDocs(collection(db, "species"));
    return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}

// Get only one species
export async function getOne(speciesId) {
    const docRef = doc(db, "species", speciesId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw new Error("No such species!");
    }
}

// Get all species for a specific planet
export async function getPlanetSpecies(planetName) {
    const snapshot = await getDocs(collection(db, "species"));
    return snapshot.docs.filter(doc => doc.data().planet === planetName).map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}

// Get all species added by specific user
export async function getUserSpecies(userEmail) {
    const snapshot = await getDocs(collection(db, "species"));
    return snapshot.docs.filter(doc => doc.data().owner === userEmail).map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
}

// Add new species
export async function addNew({ species, lifespan, image, description, planet, owner }) {
    const docRef = await addDoc(collection(db, "species"), {
        species,
        lifespan,
        image,
        description,
        planet,
        owner,
        likes: [],
        comments: []
    });
    return docRef;
}

// Edit existing species
export async function updateOne(speciesId, { species, lifespan, image, description, planet }) {
    const docRef = doc(db, "species", speciesId);
    const payload = { species, lifespan, image, description, planet };
    await updateDoc(docRef, payload);
}

// Delete existing species
export async function deleteOne(speciesId) {
    const docRef = doc(db, "species", speciesId);
    await deleteDoc(docRef);
}

// Add the user to the likes array
export async function likeOne(speciesId, user) {
    const docRef = doc(db, "species", speciesId);
    await updateDoc(docRef, {
        likes: arrayUnion(user)
    });
}

// Add comment to the comments array
export async function commentOne(speciesId, comment) {
    const docRef = doc(db, "species", speciesId);
    await updateDoc(docRef, {
        comments: arrayUnion(comment)
    });
}