// ===============================
// TAM TAK HOME PAGE JAVASCRIPT
// ===============================


// LIKE BUTTON
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const post = button.closest(".post");

        const likesText = post.querySelector(".likes span");

        let likes = parseInt(
            likesText.textContent.replace(/,/g, "")
        );

        if (button.classList.contains("liked")) {

            likes++;

            button.textContent = "♥";

        } else {

            likes--;

            button.textContent = "♡";

        }

        likesText.textContent = likes.toLocaleString();

    });

});


// FOLLOW BUTTON
const followButtons =
    document.querySelectorAll(".follow-btn");

followButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.textContent === "Follow") {

            button.textContent = "Following";

            button.style.background = "#e5e7eb";
            button.style.color = "#111827";

        } else {

            button.textContent = "Follow";

            button.style.background = "#111827";
            button.style.color = "white";

        }

    });

});


// SAVE BUTTON
const saveButtons =
    document.querySelectorAll(".save-btn");

saveButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.textContent === "♧") {

            button.textContent = "◆";

        } else {

            button.textContent = "♧";

        }

    });

});


// COMMENT BUTTON
const commentButtons =
    document.querySelectorAll(".comment-btn");

commentButtons.forEach((button) => {

    button.addEventListener("click", () => {

        alert("Tam Tak Comments opened 💬");

    });

});


// SHARE BUTTON
const shareButtons =
    document.querySelectorAll(".share-btn");

shareButtons.forEach((button) => {

    button.addEventListener("click", () => {

        alert("Tam Tak Share options opened!");

    });

});


// VIEW COMMENTS
const comments =
    document.querySelectorAll(".view-comments");

comments.forEach((comment) => {

    comment.addEventListener("click", () => {

        alert("Comments section opened.");

    });

});


// ===============================
// CREATE POST MODAL
// ===============================

const postModal =
    document.getElementById("postModal");

const createPostBtn =
    document.getElementById("createPostBtn");

const bottomCreate =
    document.getElementById("bottomCreate");

const closeModal =
    document.getElementById("closeModal");

const publishBtn =
    document.getElementById("publishBtn");

const postText =
    document.getElementById("postText");


function openPostModal() {

    postModal.classList.add("show");

}


function closePostModal() {

    postModal.classList.remove("show");

}


createPostBtn.addEventListener(
    "click",
    openPostModal
);


bottomCreate.addEventListener(
    "click",
    openPostModal
);


closeModal.addEventListener(
    "click",
    closePostModal
);


publishBtn.addEventListener("click", () => {

    const text = postText.value.trim();

    if (!text) {

        alert("Please write something first.");

        return;
    }

    alert("Post published successfully! 🎉");

    postText.value = "";

    closePostModal();

});


// ===============================
// SEARCH
// ===============================

const searchBtn =
    document.getElementById("searchBtn");

const bottomSearch =
    document.getElementById("bottomSearch");


function openSearch() {

    alert("Tam Tak Search opened 🔍");

}


searchBtn.addEventListener(
    "click",
    openSearch
);


bottomSearch.addEventListener(
    "click",
    openSearch
);


// ===============================
// NOTIFICATIONS
// ===============================

const notificationBtn =
    document.getElementById("notificationBtn");


notificationBtn.addEventListener("click", () => {

    alert("No new notifications ❤️");

});


// ===============================
// REELS
// ===============================

const reelsBtn =
    document.getElementById("reelsBtn");


reelsBtn.addEventListener("click", () => {

    alert("Tam Tak Reels opened 🎬");

});


// ===============================
// PROFILE
// ===============================

const profileBtn =
    document.getElementById("profileBtn");


profileBtn.addEventListener("click", () => {

    alert("Tam Tak Profile opened 👤");

});


// ===============================
// DOUBLE CLICK TO LIKE
// ===============================

const media =
    document.querySelectorAll(".post-media");


media.forEach((item) => {

    item.addEventListener("dblclick", () => {

        const post = item.closest(".post");

        const likeButton =
            post.querySelector(".like-btn");

        if (!likeButton.classList.contains("liked")) {

            likeButton.click();

        }

    });

});
