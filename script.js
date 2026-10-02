
import { auth, googleProvider } from "./firebase-config.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { auth, googleProvider } from "./firebase-config.js";
console.log("Firebase loaded:", auth);
console.log("Google provider loaded:", googleProvider);
/* =====================================================
   TAM TAK - STEP 4
   WORKING LOCAL LOGIN SYSTEM
   ===================================================== */


/* =====================================================
   GET ELEMENTS
   ===================================================== */

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const createAccountBtn = document.getElementById("createAccountBtn");

const showPasswordBtn = document.getElementById("showPassword");

const forgotEmailBtn = document.getElementById("forgotEmail");
const forgotPasswordBtn = document.getElementById("forgotPassword");

const googleLoginBtn = document.getElementById("googleLogin");
const facebookLoginBtn = document.getElementById("facebookLogin");

const authMessage = document.getElementById("authMessage");


/* =====================================================
   STORAGE KEYS
   ===================================================== */

const USERS_KEY = "tam_tak_users";
const CURRENT_USER_KEY = "tam_tak_current_user";


/* =====================================================
   GET USERS
   ===================================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch (error) {

        console.error(error);

        return [];
    }
}


/* =====================================================
   SAVE USERS
   ===================================================== */

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


/* =====================================================
   MESSAGE
   ===================================================== */

function showMessage(message, success = false) {

    if (!authMessage) return;

    authMessage.textContent = message;

    if (success) {

        authMessage.style.color = "#16803c";

    } else {

        authMessage.style.color = "#d93025";
    }
}


/* =====================================================
   CLEAR MESSAGE
   ===================================================== */

function clearMessage() {

    if (authMessage) {

        authMessage.textContent = "";
    }
}


/* =====================================================
   VALIDATE EMAIL
   ===================================================== */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


/* =====================================================
   PASSWORD SHOW / HIDE
   ===================================================== */

if (showPasswordBtn) {

    showPasswordBtn.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                showPasswordBtn.textContent = "Hide";

            } else {

                passwordInput.type = "password";

                showPasswordBtn.textContent = "Show";
            }

        }
    );
}


/* =====================================================
   CREATE NEW ACCOUNT
   ===================================================== */

if (createAccountBtn) {

    createAccountBtn.addEventListener(
        "click",
        function () {

            clearMessage();

            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value.trim();


            /* Check email */

            if (!email) {

                showMessage(
                    "Please enter your email address."
                );

                emailInput.focus();

                return;
            }


            /* Check email format */

            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;
            }


            /* Check password */

            if (!password) {

                showMessage(
                    "Please enter a password."
                );

                passwordInput.focus();

                return;
            }


            /* Password length */

            if (password.length < 6) {

                showMessage(
                    "Password must be at least 6 characters."
                );

                passwordInput.focus();

                return;
            }


            /* Get users */

            const users = getUsers();


            /* Check existing account */

            const existingUser =
                users.find(
                    user => user.email === email
                );


            if (existingUser) {

                showMessage(
                    "This email is already registered."
                );

                return;
            }


            /* Create user */

            const newUser = {

                id:
                    "user_" +
                    Date.now(),

                email: email,

                password: password,

                name:
                    email.split("@")[0],

                username:
                    email.split("@")[0],

                bio:
                    "Welcome to Tam Tak!",

                profilePhoto: "",

                createdAt:
                    new Date().toISOString()

            };


            /* Add user */

            users.push(newUser);

            saveUsers(users);


            /* Set current user */

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(newUser)
            );


            showMessage(
                "Account created successfully!",
                true
            );


            /* Go to home */

            setTimeout(
                function () {

                    window.location.href =
                        "home.html";

                },
                800
            );

        }
    );
}


/* =====================================================
   LOGIN
   ===================================================== */

if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        function () {

            clearMessage();

            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value.trim();


            /* Empty email */

            if (!email) {

                showMessage(
                    "Please enter your email address."
                );

                emailInput.focus();

                return;
            }


            /* Empty password */

            if (!password) {

                showMessage(
                    "Please enter your password."
                );

                passwordInput.focus();

                return;
            }


            /* Get users */

            const users = getUsers();


            /* Find account */

            const user =
                users.find(
                    account =>
                        account.email === email &&
                        account.password === password
                );


            /* Account not found */

            if (!user) {

                showMessage(
                    "Email or password is incorrect."
                );

                return;
            }


            /* Save current user */

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(user)
            );


            showMessage(
                "Login successful!",
                true
            );


            /* Redirect */

            setTimeout(
                function () {

                    window.location.href =
                        "home.html";

                },
                700
            );

        }
    );
}


/* =====================================================
   FORGOT PASSWORD
   ===================================================== */

if (forgotPasswordBtn) {

    forgotPasswordBtn.addEventListener(
        "click",
        function () {

            clearMessage();

            const email =
                emailInput.value.trim().toLowerCase();


            if (!email) {

                showMessage(
                    "Enter your email address first."
                );

                emailInput.focus();

                return;
            }


            const users = getUsers();


            const user =
                users.find(
                    account =>
                        account.email === email
                );


            if (!user) {

                showMessage(
                    "No account found with this email."
                );

                return;
            }


            /*
              Demo recovery:
              We don't send a real email here.
            */

            showMessage(
                "Account found. Real email password recovery will be added with Firebase.",
                true
            );

        }
    );
}


/* =====================================================
   FORGOT EMAIL
   ===================================================== */

if (forgotEmailBtn) {

    forgotEmailBtn.addEventListener(
        "click",
        function () {

            clearMessage();

            const users = getUsers();


            if (users.length === 0) {

                showMessage(
                    "No Tam Tak account has been created on this device."
                );

                return;
            }


            /*
              Show saved account emails.
              This is only for local testing.
            */

            const emails =
                users
                    .map(user => user.email)
                    .join(", ");


            showMessage(
                "Saved account email: " + emails,
                true
            );

        }
    );
}


/* =====================================================
   GOOGLE BUTTON
   ===================================================== */

if (googleLoginBtn) {

    console.log("Google button found");

    googleLoginBtn.addEventListener("click", async () => {

        console.log("Google button clicked");

        try {

            const result = await signInWithPopup(
                auth,
                googleProvider
            );

            console.log("LOGIN SUCCESS:", result.user);

            alert(
                "Welcome " +
                (result.user.displayName || result.user.email)
            );

            window.location.href = "home.html";

        } catch (error) {

            console.error("GOOGLE LOGIN ERROR:", error);

            alert(
                "Google Login Error:\n" +
                error.code +
                "\n" +
                error.message
            );
        }

    });

} else {

    console.error("Google button NOT found!");

}
/* =====================================================
   GET CURRENT USER
   ===================================================== */

function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem(
                CURRENT_USER_KEY
            )
        );

    } catch (error) {

        return null;
    }
}


/* =====================================================
   LOGOUT
   ===================================================== */

function logoutUser() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href =
        "index.html";
}


/* =====================================================
   MAKE LOGOUT AVAILABLE GLOBALLY
   ===================================================== */

window.logoutUser = logoutUser;


/* =====================================================
   CHECK LOGIN
   ===================================================== */

function isLoggedIn() {

    return getCurrentUser() !== null;
}


/* =====================================================
   EXPORT USER FUNCTIONS
   ===================================================== */

window.getCurrentUser = getCurrentUser;
window.isLoggedIn = isLoggedIn;


/* =====================================================
   TEST MESSAGE
   ===================================================== */

console.log(
    "Tam Tak login system loaded successfully."
);

console.log(
    "Current user:",
    getCurrentUser()
);
