import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAm895WgYQdj3zLL7SmV61RJI3LeS1IMqk",
    authDomain: "tam-tak.firebaseapp.com",
    projectId: "tam-tak",
    storageBucket: "tam-tak.firebasestorage.app",
    messagingSenderId: "101567918585",
    appId: "1:101567918585:web:be6c83246a862809cdcd28",
    measurementId: "G-MTJSV9WFJV"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

console.log("Firebase connected successfully");


export {
    auth,
    googleProvider
};
