/* =========================
   TAM TAK HOME JAVASCRIPT
========================= */


/* =========================
   LIKE BUTTON
========================= */

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const icon = this.querySelector("i");

        const post = this.closest(".post");

        const likesText = post.querySelector(".likes");

        let likes = parseInt(
            likesText.textContent.replace(/[^0-9]/g, "")
        );

        if (!this.classList.contains("liked")) {

            this.classList.add("liked");

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            likes++;

        } else {

            this.classList.remove("liked");

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            likes--;

        }

        likesText.textContent = likes.toLocaleString() + " likes";

    });

});


/* =========================
   SAVE BUTTON
========================= */

const saveButtons = document.querySelectorAll(".save-btn");

saveButtons.forEach(button => {

    button.addEventListener("click", function () {

        const icon = this.querySelector("i");

        this.classList.toggle("saved");

        if (this.classList.contains("saved")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =========================
   FOLLOW BUTTON
========================= */

const followButtons =
    document.querySelectorAll(".follow-btn");

followButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (this.textContent.trim() === "Follow") {

            this.textContent = "Following";
            this.style.color = "#555";

        } else {

            this.textContent = "Follow";
            this.style.color = "#0095f6";

        }

    });

});


/* =========================
   SHARE BUTTON
========================= */

const shareButtons =
    document.querySelectorAll(".share-btn");

shareButtons.forEach(button => {

    button.addEventListener("click", async function () {

        const post = this.closest(".post");

        const username =
            post.querySelector(".user-info h3").textContent;

        const shareData = {
            title: "Tam Tak",
            text: `Check out ${username}'s post on Tam Tak!`
        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    "Check this post on Tam Tak!"
                );

                alert("Post link copied!");

            }

        } catch (error) {

            console.log("Share cancelled");

        }

    });

});


/* =========================
   COMMENTS
========================= */

const commentButtons =
    document.querySelectorAll(".comment-btn");

commentButtons.forEach(button => {

    button.addEventListener("click", function () {

        const post = this.closest(".post");

        const username =
            post.querySelector(".user-info h3").textContent;

        const comment = prompt(
            `Comment on ${username}'s post:`
        );

        if (comment && comment.trim() !== "") {

            alert("Comment added successfully!");

        }

    });

});


/* =========================
   CREATE POST MODAL
========================= */

const postModal =
    document.getElementById("postModal");

const createPostBtn =
    document.getElementById("createPostBtn");

const bottomCreateBtn =
    document.getElementById("bottomCreateBtn");

const closeModal =
    document.getElementById("closeModal");


function openCreatePost() {

    postModal.classList.add("show");

}


createPostBtn.addEventListener(
    "click",
    openCreatePost
);


bottomCreateBtn.addEventListener(
    "click",
    openCreatePost
);


closeModal.addEventListener(
    "click",
    function () {

        postModal.classList.remove("show");

    }
);


/* Close modal outside box */

postModal.addEventListener(
    "click",
    function (event) {

        if (event.target === postModal) {

            postModal.classList.remove("show");

        }

    }
);


/* =========================
   PUBLISH POST
========================= */

const publishBtn =
    document.getElementById("publishBtn");

const postImage =
    document.getElementById("postImage");

publishBtn.addEventListener(
    "click",
    function () {

        if (!postImage.files.length) {

            alert("Please select an image first.");

            return;

        }

        alert(
            "Post ready! Firebase Storage ko connect karne ke baad ye post permanently upload hogi."
        );

        postModal.classList.remove("show");

    }
);


/* =========================
   SEARCH
========================= */

document
    .getElementById("searchBtn")
    .addEventListener("click", function () {

        const search =
            prompt("Tam Tak par kya search karna hai?");

        if (search && search.trim() !== "") {

            alert(
                `Searching for "${search}"...`
            );

        }

    });


/* =========================
   REELS
========================= */

document
    .getElementById("reelsBtn")
    .addEventListener("click", function () {

        alert(
            "Tam Tak Reels page next step mein connect karenge."
        );

    });


/* =========================
   PROFILE
========================= */

document
    .getElementById("profileBtn")
    .addEventListener("click", function () {

        alert(
            "Tam Tak Profile page next step mein connect karenge."
        );

    });


/* =========================
   NOTIFICATION
========================= */

document
    .getElementById("notificationBtn")
    .addEventListener("click", function () {

        alert(
            "No new notifications."
        );

    });


/* =========================
   DOUBLE CLICK LIKE
========================= */

const postImages =
    document.querySelectorAll(".post-media img");

postImages.forEach(image => {

    image.addEventListener(
        "dblclick",
        function () {

            const post =
                this.closest(".post");

            const likeButton =
                post.querySelector(".like-btn");

            if (!likeButton.classList.contains("liked")) {

                likeButton.click();

            }

        }
    );

});


/* =========================
   LOGIN → HOME
=========================

   Apne login page ke successful
   login ke baad ye use kar sakte ho:

   window.location.href = "home.html";

========================= */

console.log("Tam Tak Home loaded successfully!");
