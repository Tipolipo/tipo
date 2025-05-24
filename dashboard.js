import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAHxD1cLtc9iBL1XENJuPvdACLqn4Kmgek",
  authDomain: "tipo-d5f6e.firebaseapp.com",
  projectId: "tipo-d5f6e",
  storageBucket: "tipo-d5f6e.appspot.com",
  messagingSenderId: "806761149176",
  appId: "1:806761149176:web:d0398147122f54eaba810d",
  measurementId: "G-JQTQD9KS84"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById("username").textContent = user.email;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("wallet").textContent = `₵${data.wallet || 0}`;
      document.getElementById("spent").textContent = `₵${data.spent || 0}`;
      document.getElementById("orders").textContent = `${data.orders || 0}`;
    }
  } else {
    window.location.href = "login.html";
  }
});

document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});