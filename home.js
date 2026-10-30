import {
    auth,
    db
} from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

// Initialize Firebase Storage
const storage = getStorage();

const feed = document.getElementById("feed");
const postModal = document.getElementById("postModal");
const postText = document.getElementById("postText");
const postImageInput = document.getElementById("postImageInput");
const publishBtn = document.getElementById("publishBtn");

function openPostModal() {
    if (postModal) postModal.classList.add("show");
}

function closePostModal() {
    if (postModal) {
        postModal.classList.remove("show");
        if (postText) postText.value = "";
        if (postImageInput) postImageInput.value = "";
    }
}

// Modal open/close listeners
const createBtn = document.getElementById("createPostBtn");
const bottomCreateBtn = document.getElementById("bottomCreate");
const closeModalBtn = document.getElementById("closeModal");

if (createBtn) createBtn.addEventListener("click", openPostModal);
if (bottomCreateBtn) bottomCreateBtn.addEventListener("click", openPostModal);
if (closeModalBtn) closeModalBtn.addEventListener("click", closePostModal);

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function createPostElement(post) {
    const name = escapeHTML(post.userName || "Tam Tak User");
    const text = escapeHTML(post.text || "");
    const imageUrl = post.imageUrl ? escapeHTML(post.imageUrl) : null;
    const initial = escapeHTML(name.charAt(0).toUpperCase());

    const article = document.createElement("article");
    article.className = "post";

    let imageHTML = "";
    if (imageUrl) {
        imageHTML = `<div class="post-media" style="margin-top:10px; width:100%; text-align:center;">
            <img src="${imageUrl}" alt="Post image" style="max-width:100%; max-height:450px; border-radius:8px; object-fit:cover;">
        </div>`;
    }

    article.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <div class="user-avatar">${initial}</div>
                <div>
                    <strong>${name}</strong>
                    <small>@tamtak · ${post.createdAt?.toDate
                        ? post.createdAt.toDate().toLocaleString()
                        : "Just now"}</small>
                </div>
            </div>
        </div>

        ${imageHTML}

        <div class="post-content" style="padding-top:10px;">
            <p class="caption">${text}</p>
        </div>

        <div class="post-actions">
            <div class="left-actions">
                <button class="action-btn like-btn">♡</button>
                <button class="action-btn comment-btn">💬</button>
                <button class="action-btn share-btn">➤</button>
            </div>
            <button class="action-btn save-btn">♧</button>
        </div>

        <div class="post-content">
            <div class="likes"><span>0</span> likes</div>
        </div>
    `;

    // Like logic
    const likeButton = article.querySelector(".like-btn");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("liked");
        const liked = likeButton.classList.contains("liked");
        likeButton.textContent = liked ? "♥" : "♡";

        const count = article.querySelector(".likes span");
        count.textContent = Math.max(
            0,
            Number(count.textContent) + (liked ? 1 : -1)
        );
    });

    // Share logic
    article.querySelector(".share-btn").addEventListener("click", async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: "Tam Tak", text });
            } catch (error) {}
        }
    });

    // Save logic
    const saveButton = article.querySelector(".save-btn");
    saveButton.addEventListener("click", () => {
        saveButton.textContent =
            saveButton.textContent === "♧" ? "◆" : "♧";
    });

    return article;
}

async function loadPosts() {
    if (!feed) return;
    feed.innerHTML = `<p style="padding:20px;text-align:center;">Loading posts...</p>`;

    try {
        // Query without orderBy to prevent index errors
        const snapshot = await getDocs(collection(db, "posts"));
        feed.innerHTML = "";

        if (snapshot.empty) {
            feed.innerHTML = `
                <p style="padding:20px;text-align:center;">
                    No posts yet. Create the first post!
                </p>`;
            return;
        }

        snapshot.forEach(documentSnapshot => {
            feed.appendChild(
                createPostElement(documentSnapshot.data())
            );
        });

    } catch (error) {
        console.error("Post loading error:", error);
        feed.innerHTML = `
            <p style="padding:20px;text-align:center;">
                Posts could not load. Check Firestore connection.
            </p>`;
    }
}

// Check Auth State securely
onAuthStateChanged(auth, user => {
    if (user) {
        loadPosts();
    } else {
        if (feed) {
            feed.innerHTML = `
                <p style="padding:20px;text-align:center;">
                    Please log in to view posts.
                </p>`;
        }
    }
});

// Publish Post with optional Photo Upload
if (publishBtn) {
    publishBtn.addEventListener("click", async () => {
        const text = postText ? postText.value.trim() : "";
        const file = postImageInput && postImageInput.files[0] ? postImageInput.files[0] : null;
        const user = auth.currentUser;

        if (!user) {
            alert("Please log in first.");
            return;
        }

        if (!text && !file) {
            alert("Please write something or choose an image.");
            return;
        }

        publishBtn.disabled = true;
        publishBtn.textContent = "Publishing...";

        try {
            let imageUrl = "";

            // Upload photo to Firebase Storage if selected
            if (file) {
                const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
                const uploadResult = await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(uploadResult.ref);
            }

            // Add document to Firestore
            await addDoc(collection(db, "posts"), {
                userId: user.uid,
                userName: user.displayName || user.email.split("@")[0] || "Tam Tak User",
                text: text,
                imageUrl: imageUrl,
                createdAt: new Date()
            });

            closePostModal();
            await loadPosts();

        } catch (error) {
            console.error("Publishing error:", error);
            alert("Error publishing post: " + error.message);
        } finally {
            publishBtn.disabled = false;
            publishBtn.textContent = "Publish Post";
        }
    });
}

// Navigation Listeners
const reelsBtn = document.getElementById("reelsBtn");
const profileBtn = document.getElementById("profileBtn");

if (reelsBtn) {
    reelsBtn.addEventListener("click", () => {
        window.location.href = "./reels.html";
    });
}

if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        window.location.href = "./profile.html";
    });
}
