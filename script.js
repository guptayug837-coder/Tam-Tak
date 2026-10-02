
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { auth } from "./firebase-config.js";


console.log("Firebase Auth loaded");


function showMessage(text, success = false) {

    const box = document.getElementById("authMessage");

    if (box) {
        box.textContent = text;
        box.style.color = success ? "green" : "red";
    }

    console.log(text);
}


/* ==============================
   CREATE ACCOUNT
============================== */

const createAccountBtn =
    document.getElementById("createAccountBtn");

if (createAccountBtn) {

    createAccountBtn.onclick = async function () {

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!email) {
            showMessage("Email enter karo.");
            return;
        }

        if (!password) {
            showMessage("Password enter karo.");
            return;
        }

        if (password.length < 6) {
            showMessage(
                "Password minimum 6 characters ka hona chahiye."
            );
            return;
        }

        createAccountBtn.disabled = true;

        createAccountBtn.textContent =
            "Creating Account...";

        try {

            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            console.log(
                "Account created:",
                result.user
            );

            showMessage(
                "Account successfully created!",
                true
            );

            setTimeout(function () {

                window.location.href =
                    "./home.html";

            }, 1000);

        } catch (error) {

            console.error(
                "Firebase error:",
                error
            );

            showMessage(
                error.message
            );

        } finally {

            createAccountBtn.disabled = false;

            createAccountBtn.textContent =
                "Create New Account";
        }
    };
}


/* ==============================
   SHOW PASSWORD
============================== */

const showPassword =
    document.getElementById("showPassword");

if (showPassword) {

    showPassword.onclick = function () {

        const password =
            document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";
            showPassword.textContent = "Hide";

        } else {

            password.type = "password";
            showPassword.textContent = "Show";
        }
    };
}


/* ==============================
   OTHER BUTTON TESTS
============================== */

const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.onclick = function () {

        showMessage(
            "Login button successfully working hai."
        );

    };
}


const googleLogin =
    document.getElementById("googleLogin");

if (googleLogin) {

    googleLogin.onclick = function () {

        showMessage(
            "Google button successfully working hai."
        );

    };
}


const facebookLogin =
    document.getElementById("facebookLogin");

if (facebookLogin) {

    facebookLogin.onclick = function () {

        showMessage(
            "Facebook button successfully working hai."
        );

    };
}


console.log("Tam Tak ready");
