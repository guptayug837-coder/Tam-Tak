import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyAm895WgYQdj3zLL7SmV61RJI3LeS1IMqk",
  authDomain: "tam-tak.firebaseapp.com",
  projectId: "tam-tak",
  storageBucket: "tam-tak.firebasestorage.app",
  messagingSenderId: "101567918585",
  appId: "1:101567918585:web:5f697ea6c737a02ccdcd28",
  measurementId: "G-QHVJMEDY99"
};


// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// ===============================
// GOOGLE LOGIN
// ===============================

const googleLogin = document.getElementById("googleLogin");

if (googleLogin) {
  googleLogin.addEventListener("click", async () => {

    try {

      googleLogin.disabled = true;
      googleLogin.textContent = "Opening Google...";

      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google Login Successful:", result.user);

      window.location.href = "home.html";

    } catch (error) {

      console.error("Google Login Error:", error);

      alert("Google Login Error: " + error.code);

      googleLogin.disabled = false;
      googleLogin.innerHTML = "<span>G</span> Continue with Google";
    }

  });
}


// ===============================
// EMAIL LOGIN
// ===============================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Login Successful:", result.user);

      window.location.href = "home.html";

    } catch (error) {

      console.error(error);
      alert("Login Error: " + error.code);

    }

  });

}


// ===============================
// CREATE ACCOUNT
// ===============================

const createAccountBtn =
  document.getElementById("createAccountBtn");

if (createAccountBtn) {

  createAccountBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Enter email and password first.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {

      const result =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log("Account Created:", result.user);

      alert("Account created successfully!");

      window.location.href = "home.html";

    } catch (error) {

      console.error(error);
      alert("Create Account Error: " + error.code);

    }

  });

}


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

const showPassword =
  document.getElementById("showPassword");

if (showPassword) {

  showPassword.addEventListener("click", () => {

    const password =
      document.getElementById("password");

    if (password.type === "password") {

      password.type = "text";
      showPassword.textContent = "Hide";

    } else {

      password.type = "password";
      showPassword.textContent = "Show";

    }

  });

}


// ===============================
// FORGOT PASSWORD
// ===============================

const forgotPassword =
  document.getElementById("forgotPassword");

if (forgotPassword) {

  forgotPassword.addEventListener("click", async () => {

    const email =
      document.getElementById("email").value.trim();

    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    try {

      await sendPasswordResetEmail(auth, email);

      alert("Password reset email sent.");

    } catch (error) {

      console.error(error);
      alert("Error: " + error.code);

    }

  });

}
