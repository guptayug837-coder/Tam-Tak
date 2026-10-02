import {
  onAuthStateChanged,
  signOut
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  auth,
  db
} from "./firebase.js";


const welcomeText =
  document.getElementById("welcomeText");

const postText =
  document.getElementById("postText");

const postButton =
  document.getElementById("postButton");

const feed =
  document.getElementById("feed");


let currentUser = null;


onAuthStateChanged(auth, user => {

  if (!user) {

    window.location.href = "login.html";

    return;
  }

  currentUser = user;

  welcomeText.innerText =
    "Welcome to Tam Tak 👋 " +
    (user.email || "");

  loadPosts();

});


postButton.addEventListener(
  "click",
  async () => {

    const text =
      postText.value.trim();

    if (!text) {

      alert("Write something first");

      return;
    }

    try {

      await addDoc(
        collection(db, "posts"),
        {
          text: text,
          userId: currentUser.uid,
          email: currentUser.email,
          likes: 0,
          createdAt: new Date()
        }
      );

      postText.value = "";

    } catch (error) {

      alert(error.message);

    }

  }
);


function loadPosts() {

  const postsQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(
    postsQuery,
    snapshot => {

      feed.innerHTML = "";

      snapshot.forEach(doc => {

        const post = doc.data();

        const div =
          document.createElement("div");

        div.className = "post";

        div.innerHTML = `

          <div class="post-user">
            👤 ${post.email || "User"}
          </div>

          <p>
            ${escapeHTML(post.text)}
          </p>

          <div class="post-actions">

            <button>
              ❤️ ${post.likes || 0}
            </button>

            <button>
              💬 Comment
            </button>

            <button>
              ↗️ Share
            </button>

          </div>

        `;

        feed.appendChild(div);

      });

    }
  );

}


function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


document
  .getElementById("logout")
  .addEventListener(
    "click",
    async () => {

      await signOut(auth);

      window.location.href =
        "login.html";

    }
  );