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


/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyAm895WgYQdj3zLL7SmV61RJI3LeS1IMqk",

    authDomain:
        "tam-tak.firebaseapp.com",

    projectId:
        "tam-tak",

    storageBucket:
        "tam-tak.firebasestorage.app",

    messagingSenderId:
        "101567918585",

    appId:
        "1:101567918585:web:be6c83246a862809cdcd28",

    measurementId:
        "G-MTJSV9WFJV"
};


/* =========================
   INITIALIZE FIREBASE
========================= */

const app =
    initializeApp(firebaseConfig);


/* =========================
   AUTH
========================= */

const auth =
    getAuth(app);


/* =========================
   GOOGLE LOGIN
========================= */

const googleProvider =
    new GoogleAuthProvider();


/* =========================
   FIRESTORE
========================= */

const db =
    getFirestore(app);


/* =========================
   STORAGE
========================= */

const storage =
    getStorage(app);


/* =========================
   CONNECTION CHECK
========================= */

console.log(
    "Firebase Auth + Firestore + Storage connected successfully"
);


/* =========================
   EXPORT
========================= */

export {
    auth,
    googleProvider,
    db,
    storage
};
