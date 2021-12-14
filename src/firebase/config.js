import { initializeApp } from "firebase/app";
const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");

const firebaseConfig = {
    apiKey: "AIzaSyDoCcBDQ0GCEne1NeiJZc9wLOHO359s8RA",
    authDomain: "cosmos-react-app.firebaseapp.com",
    projectId: "cosmos-react-app",
    storageBucket: "cosmos-react-app.appspot.com",
    messagingSenderId: "812120887402",
    appId: "1:812120887402:web:8b8478c5b10fb4eef7fa13"
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lcs_J8dAAAAAOYZkJ1uPlUYtofAMAQR_pcY01BL'),
    isTokenAutoRefreshEnabled: true
});