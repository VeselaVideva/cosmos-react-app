// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


jest.mock("firebase/firestore", () => {
    return {
        getFirestore: jest.fn(),
    };
});

jest.mock("firebase/auth", () => {
    return {
        getAuth: jest.fn(),
    };
});