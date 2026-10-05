// ==========================================
// TAM TAK - LOGIN JAVASCRIPT
// ==========================================

// Firebase imports
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
    apiKey: "PASTE_YOUR_API_KEY",
    authDomain: "tam-tak.firebaseapp.com",
    projectId: "tam-tak",
    storageBucket: "tam-tak.firebasestorage.app",
    messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
    appId: "PASTE_YOUR_APP_ID"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ==========================================
// PROVIDERS
// ==========================================

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


// ==========================================
// ELEMENTS
// ==========================================

const googleLogin =
    document.getElementById("googleLogin");

const facebookLogin =
    document.getElementById("facebookLogin");

const loginBtn =
    document.getElementById("loginBtn");

const createAccountBtn =
    document.getElementById("createAccountBtn");

const showPassword =
    document.getElementById("showPassword");

const forgotPassword =
    document.getElementById("forgotPassword");

const forgotEmail =
    document.getElementById("forgotEmail");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const authMessage =
    document.getElementById("authMessage");


// ==========================================
// MESSAGE FUNCTION
// ==========================================

function showMessage(message, type = "normal") {

    if (!authMessage) return;

    authMessage.textContent = message;

    if (type === "error") {
        authMessage.style.color = "#e53935";
    } else {
        authMessage.style.color = "#16803c";
    }
}


// ==========================================
// GO TO HOME
// ==========================================

function goToHome() {

    showMessage("Login successful. Opening Tam Tak...");

    setTimeout(() => {
        window.location.href = "home.html";
    }, 700);

}


// ==========================================
// GOOGLE LOGIN
// ==========================================

if (googleLogin) {

    googleLogin.addEventListener("click", async () => {

        try {

            showMessage("Opening Google Login...");

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );

            console.log(
                "Google user:",
                result.user
            );

            goToHome();

        } catch (error) {

            console.error(error);

            showMessage(
                "Google Login Error: " + error.code,
                "error"
            );

        }

    });

}


// ==========================================
// FACEBOOK LOGIN
// ==========================================

if (facebookLogin) {

    facebookLogin.addEventListener("click", async () => {

        try {

            showMessage("Opening Facebook Login...");

            const result =
                await signInWithPopup(
                    auth,
                    facebookProvider
                );

            console.log(
                "Facebook user:",
                result.user
            );

            goToHome();

        } catch (error) {

            console.error(error);

            showMessage(
                "Facebook Login Error: " + error.code,
                "error"
            );

        }

    });

}


// ==========================================
// EMAIL LOGIN
// ==========================================

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        if (!email) {

            showMessage(
                "Please enter your email.",
                "error"
            );

            emailInput.focus();

            return;
        }

        if (!password) {

            showMessage(
                "Please enter your password.",
                "error"
            );

            passwordInput.focus();

            return;
        }


        try {

            showMessage("Logging in...");

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            console.log(
                "Logged in user:",
                result.user
            );

            goToHome();

        } catch (error) {

            console.error(error);

            showMessage(
                "Login failed: " + error.code,
                "error"
            );

        }

    });

}


// ==========================================
// CREATE ACCOUNT
// ==========================================

if (createAccountBtn) {

    createAccountBtn.addEventListener(
        "click",
        async () => {

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            if (!email) {

                showMessage(
                    "Enter your email to create an account.",
                    "error"
                );

                return;
            }


            if (!password || password.length < 6) {

                showMessage(
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;
            }


            try {

                showMessage(
                    "Creating your Tam Tak account..."
                );

                const result =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                console.log(
                    "New user:",
                    result.user
                );

                goToHome();

            } catch (error) {

                console.error(error);

                showMessage(
                    "Account error: " + error.code,
                    "error"
                );

            }

        }
    );

}


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

if (showPassword) {

    showPassword.addEventListener(
        "click",
        () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                showPassword.textContent = "Hide";

            } else {

                passwordInput.type = "password";

                showPassword.textContent = "Show";

            }

        }
    );

}


// ==========================================
// FORGOT PASSWORD
// ==========================================

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async () => {

            const email =
                emailInput.value.trim();

            if (!email) {

                showMessage(
                    "Enter your email first.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            try {

                await sendPasswordResetEmail(
                    auth,
                    email
                );

                showMessage(
                    "Password reset email sent."
                );

            } catch (error) {

                console.error(error);

                showMessage(
                    "Reset error: " + error.code,
                    "error"
                );

            }

        }
    );

}


// ==========================================
// FORGOT EMAIL
// ==========================================

if (forgotEmail) {

    forgotEmail.addEventListener(
        "click",
        () => {

            showMessage(
                "Please enter the email you used when creating your Tam Tak account.",
                "error"
            );

        }
    );

}


console.log(
    "Tam Tak Login loaded successfully!"
);
