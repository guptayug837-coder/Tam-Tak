
import {
    auth,
    db
} from "./firebase-config.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const feed = document.getElementById("feed");
const feedStatus = document.getElementById("feedStatus");
const postModal = document.getElementById("postModal");
const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");

function openPostModal() {
    postModal.classList.add("show");
}

function closePostModal() {
    postModal.classList.remove("show");
}

document.getElementById("createPostBtn").addEventListener("click", openPostModal);
document.getElementById("bottomCreate").addEventListener("click", openPostModal);
document.getElementById("closeModal").addEventListener("click", closePostModal);

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
    const initial = escapeHTML(name.charAt(0).toUpperCase());

    const article = document.createElement("article");
    article.className = "post";

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

        <div class="post-content" style="padding-top:16px;">
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

    article.querySelector(".comment-btn").addEventListener("click", () => {
        alert("Comments feature is coming next!");
    });

    article.querySelector(".share-btn").addEventListener("click", async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: "Tam Tak", text });
            } catch (error) {}
        } else {
            alert("Sharing is not supported on this device.");
        }
    });

    const saveButton = article.querySelector(".save-btn");
    saveButton.addEventListener("click", () => {
        saveButton.textContent =
            saveButton.textContent === "♧" ? "◆" : "♧";
    });

    return article;
}

async function loadPosts() {
    feed.innerHTML = `<p style="padding:20px;text-align:center;">Loading posts...</p>`;

    try {
        const postsQuery = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(postsQuery);
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
                Posts could not load. Check Firestore rules and connection.
            </p>`;
    }
}

onAuthStateChanged(auth, user => {
    if (user) {
        loadPosts();
    } else {
        feed.innerHTML = `
            <p style="padding:20px;text-align:center;">
                Please log in to view posts.
            </p>`;
    }
});

publishBtn.addEventListener("click", async () => {
    const text = postText.value.trim();
    const user = auth.currentUser;

    if (!user) {
        alert("Please log in first.");
        return;
    }

    if (!text) {
        alert("Please write something first.");
        return;
    }

    publishBtn.disabled = true;
    publishBtn.textContent = "Publishing...";

    try {
        await addDoc(collection(db, "posts"), {
            userId: user.uid,
            userName: user.displayName || user.email || "Tam Tak User",
            text: text,
            createdAt: serverTimestamp()
        });

        postText.value = "";
        closePostModal();
        await loadPosts();
        alert("Post published successfully! 🎉");

    } catch (error) {
        console.error("Publishing error:", error);
        alert("Post publish nahi hua. Firestore rules check karo.");
    } finally {
        publishBtn.disabled = false;
        publishBtn.textContent = "Publish Post";
    }
});

document.getElementById("searchBtn").addEventListener("click", () => {
    alert("Search feature coming soon!");
});

document.getElementById("bottomSearch").addEventListener("click", () => {
    alert("Search feature coming soon!");
});

document.getElementById("notificationBtn").addEventListener("click", () => {
    alert("No new notifications ❤️");
});

document.getElementById("reelsBtn").addEventListener("click", () => {
    window.location.href = "./reels.html";
});

document.getElementById("profileBtn").addEventListener("click", () => {
    window.location.href = "./profile.html";
});
