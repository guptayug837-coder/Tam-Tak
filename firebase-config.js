import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";


const firebaseConfig = {

    apiKey: "AIzaSyAm895WgYQdj3zLL7SmV61RJI3LeS1IMqk",

    authDomain: "tam-tak.firebaseapp.com",

    projectId: "tam-tak",

    storageBucket: "tam-tak.firebasestorage.app",

    messagingSenderId: "101567918585",

    appId: "1:101567918585:web:be6c83246a862809cdcd28",

    measurementId: "G-MTJSV9WFJV"

};


const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const googleProvider =
    new GoogleAuthProvider();


const db =
    getFirestore(app);


const storage =
    getStorage(app);


console.log(
    "Firebase Auth + Firestore + Storage connected successfully"
);


export {
    auth,
    googleProvider,
    db,
    storage
};
