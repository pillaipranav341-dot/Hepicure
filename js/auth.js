// ============================================================
// AUTH.JS — Google sign-in, session guard, sign-out
// ============================================================

const provider = new firebase.auth.GoogleAuthProvider();

/* ---------- called from login.html ---------- */
function hepicureSignIn() {
  const errorBox = document.getElementById('login-error');
  const loading = document.getElementById('login-loading');
  const btn = document.getElementById('google-signin-btn');

  if (errorBox) errorBox.style.display = 'none';
  if (loading) loading.style.display = 'block';
  if (btn) btn.disabled = true;

  auth.signInWithPopup(provider)
    .then(() => {
      // Auth-only flow — no Firestore write (no billing plan needed).
      // User's name/email/photo already come from Google via auth.currentUser.
      window.location.href = 'home.html';
    })
    .catch((err) => {
      console.error('Sign-in failed:', err);
      if (loading) loading.style.display = 'none';
      if (btn) btn.disabled = false;
      if (errorBox) {
        errorBox.textContent = 'Sign-in didn\'t go through. Please try again.';
        errorBox.style.display = 'block';
      }
    });
}

/* ---------- called on home.html / subscription.html / track-order.html ---------- */
function hepicureRequireAuth(onReady) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    if (typeof onReady === 'function') onReady(user);
  });
}

function hepicureSignOut() {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
}

/* ---------- if already signed in, skip straight past login.html ---------- */
function hepicureRedirectIfSignedIn() {
  auth.onAuthStateChanged((user) => {
    if (user) window.location.href = 'home.html';
  });
}
