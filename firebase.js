
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "tipo-d5f6e.firebaseapp.com",
  projectId: "tipo-d5f6e",
  storageBucket: "tipo-d5f6e.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (!user && window.location.pathname.includes('dashboard')) {
    window.location.href = 'login.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', async e => {
      e.preventDefault();
      const network = document.getElementById('network').value;
      const amount = document.getElementById('amount').value;
      const phone = document.getElementById('phone').value;
      try {
        await db.collection('orders').add({
          user: auth.currentUser.email,
          network,
          amount,
          phone,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('orderStatus').textContent = 'Order placed successfully!';
        // Email trigger would be handled by backend or Firebase function
      } catch (err) {
        document.getElementById('orderStatus').textContent = 'Error placing order.';
      }
    });
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
}
