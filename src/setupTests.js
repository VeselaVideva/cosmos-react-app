// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


// Mock entire Firestore since in tests we do not rely on the
// details of the implementation of the 3rd-party library
jest.mock("firebase/firestore", () => {
    return {
        getFirestore: jest.fn(),
    };
});

HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
};