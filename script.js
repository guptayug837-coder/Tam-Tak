
// ==========================================
// TAM TAK - FIREBASE AUTHENTICATION
// ==========================================

import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    auth,
    googleProvider
} from "./firebase-config.js";


// ==========================================
// HTML ELEMENTS
// ==========================================

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const createAccountBtn = document.getElementById("createAccountBtn");

const googleLogin = document.getElementById("googleLogin");
const facebookLogin = document.getElementById("facebookLogin");

const showPassword = document.getElementById("showPassword");

const forgotEmail = document.getElementById("forgotEmail");
const forgotPassword = document.getElementById("forgotPassword");

const authMessage = document.getElementById("authMessage");


// ==========================================
// MESSAGE FUNCTION
// ==========================================

function showMessage(message, type = "normal") {

    if (!authMessage) return;

    authMessage.textContent = message;

    authMessage.className = "auth-message";

    if (type === "error") {
        authMessage.classList.add("error");
    }

    if (type === "success") {
        authMessage.classList.add("success");
    }
}


// ==========================================
// SAVE USER SESSION
// ==========================================

function saveUser(user) {

    const userData = {
        uid: user.uid,
        email: user.email || "",
        name: user.displayName || "",
        profilePhoto: user.photoURL || ""
    };

    localStorage.setItem(
        "tam_tak_current_user",
        JSON.stringify(userData)
    );
}


// ==========================================
// GO TO HOME
// ==========================================

function goToHome(user) {

    saveUser(user);

    // Agar home.html available hai to wahan jao
    window.location.href = "./home.html";
}


// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

if (showPassword) {

    showPassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            showPassword.textContent = "Hide";

        } else {

            passwordInput.type = "password";

            showPassword.textContent = "Show";
        }
    });
}


// ==========================================
// CREATE ACCOUNT
// ==========================================

if (createAccountBtn) {

    createAccountBtn.addEventListener("click", async () => {

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            emailInput.focus();

            return;
        }


        if (!password) {

            showMessage(
                "Please enter a password.",
                "error"
            );

            passwordInput.focus();

            return;
        }


        // Firebase password policy
        if (!/[a-z]/.test(password)) {

            showMessage(
                "Password must contain a lowercase letter.",
                "error"
            );

            return;
        }


        if (!/[A-Z]/.test(password)) {

            showMessage(
                "Password must contain an uppercase letter.",
                "error"
            );

            return;
        }


        if (!/[^A-Za-z0-9]/.test(password)) {

            showMessage(
                "Password must contain a special character, e.g. @ # !",
                "error"
            );

            return;
        }


        createAccountBtn.disabled = true;

        createAccountBtn.textContent = "Creating...";

        showMessage("Creating your account...");


        try {

            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            showMessage(
                "Account created successfully!",
                "success"
            );


            setTimeout(() => {

                goToHome(result.user);

            }, 700);


        } catch (error) {

            console.error("Create Account Error:", error);


            if (error.code === "auth/email-already-in-use") {

                showMessage(
                    "This email is already registered. Please Login instead.",
                    "error"
                );

            } else if (
                error.code ===
                "auth/password-does-not-meet-requirements"
            ) {

                showMessage(
                    "Password needs uppercase, lowercase and special character.",
                    "error"
                );

            } else if (error.code === "auth/invalid-email") {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

            } else {

                showMessage(
                    error.message,
                    "error"
                );
            }


        } finally {

            createAccountBtn.disabled = false;

            createAccountBtn.textContent =
                "Create New Account";
        }
    });
}


// ==========================================
// LOGIN
// ==========================================

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email = emailInput.value.trim();
        const password = passwordInput.value;


        if (!email) {

            showMessage(
                "Please enter your email address.",
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


        loginBtn.disabled = true;

        loginBtn.textContent = "Logging in...";

        showMessage("Logging in...");


        try {

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            showMessage(
                "Login successful!",
                "success"
            );


            setTimeout(() => {

                goToHome(result.user);

            }, 500);


        } catch (error) {

            console.error("Login Error:", error);


            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found"
            ) {

                showMessage(
                    "Incorrect email or password.",
                    "error"
                );

            } else {

                showMessage(
                    error.message,
                    "error"
                );
            }


        } finally {

            loginBtn.disabled = false;

            loginBtn.textContent = "Log In";
        }
    });
}


// ==========================================
// GOOGLE LOGIN
// ==========================================

if (googleLogin) {

    googleLogin.addEventListener("click", async () => {

        googleLogin.disabled = true;

        googleLogin.textContent = "Connecting...";

        showMessage("Connecting to Google...");


        try {

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );


            showMessage(
                "Google login successful!",
                "success"
            );


            setTimeout(() => {

                goToHome(result.user);

            }, 500);


        } catch (error) {

            console.error("Google Login Error:", error);


            if (
                error.code ===
                "auth/popup-closed-by-user"
            ) {

                showMessage(
                    "Google login was cancelled.",
                    "error"
                );

            } else {

                showMessage(
                    error.message,
                    "error"
                );
            }


        } finally {

            googleLogin.disabled = false;

            googleLogin.innerHTML =
                "<span>G</span> Continue with Google";
        }
    });
}


// ==========================================
// FACEBOOK LOGIN
// ==========================================

if (facebookLogin) {

    facebookLogin.addEventListener("click", async () => {

        facebookLogin.disabled = true;

        facebookLogin.textContent = "Connecting...";

        showMessage("Connecting to Facebook...");


        try {

            const facebookProvider =
                new FacebookAuthProvider();


            const result =
                await signInWithPopup(
                    auth,
                    facebookProvider
                );


            showMessage(
                "Facebook login successful!",
                "success"
            );


            setTimeout(() => {

                goToHome(result.user);

            }, 500);


        } catch (error) {

            console.error(
                "Facebook Login Error:",
                error
            );


            showMessage(
                error.message,
                "error"
            );


        } finally {

            facebookLogin.disabled = false;

            facebookLogin.innerHTML =
                "<span>f</span> Continue with Facebook";
        }
    });
}


// ==========================================
// FORGOT PASSWORD
// ==========================================

if (forgotPassword) {

    forgotPassword.addEventListener("click", async () => {

        const email = emailInput.value.trim();


        if (!email) {

            showMessage(
                "Enter your email first, then click Forgot Password.",
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
                "Password reset email sent. Check your inbox.",
                "success"
            );


        } catch (error) {

            console.error(
                "Password Reset Error:",
                error
            );


            if (error.code === "auth/user-not-found") {

                showMessage(
                    "No account found with this email.",
                    "error"
                );

            } else {

                showMessage(
                    error.message,
                    "error"
                );
            }
        }
    });
}


// ==========================================
// FORGOT EMAIL
// ==========================================

if (forgotEmail) {

    forgotEmail.addEventListener("click", () => {

        showMessage(
            "Please enter the email you used to create your Tam Tak account.",
            "normal"
        );
    });
}


// ==========================================
// CHECK FIREBASE AUTH
// ==========================================

console.log("Tam Tak Firebase authentication loaded successfully.");
