// ============================================================
// AUTH.JS — email / phone / skip-as-guest
//
// NOTE: This is a lightweight session flow, not a verified
// login. It stores who the person said they are in the
// browser's localStorage so the app can greet them and gate
// pages, without needing a backend or OTP service.
//
// To upgrade to REAL verified sign-in later (recommended
// before real money/orders are involved):
//   - Email: Firebase Auth "email link" sign-in (free)
//   - Phone: Firebase Auth phone/OTP sign-in (free tier
//     available, needs reCAPTCHA setup)
// Ask for that upgrade whenever you're ready.
// ============================================================

const HEPICURE_SESSION_KEY = 'hepicure_session';

function hepicureSaveSession(session) {
  localStorage.setItem(HEPICURE_SESSION_KEY, JSON.stringify(session));
}

function hepicureGetSession() {
  try {
    const raw = localStorage.getItem(HEPICURE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function hepicureShowError(msg) {
  const box = document.getElementById('login-error');
  if (!box) return;
  box.textContent = msg;
  box.style.display = 'block';
}

/* ---------- called from login.html ---------- */
function hepicureContinueEmail() {
  const input = document.getElementById('email-input');
  const value = input.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    hepicureShowError('Enter a valid email address to continue.');
    return;
  }
  hepicureSaveSession({ type: 'email', identity: value, name: value.split('@')[0] });
  window.location.href = 'home.html';
}

function hepicureContinuePhone() {
  const input = document.getElementById('phone-input');
  const value = input.value.trim();
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length < 10) {
    hepicureShowError('Enter a valid phone number to continue.');
    return;
  }
  hepicureSaveSession({ type: 'phone', identity: value, name: value });
  window.location.href = 'home.html';
}

function hepicureSkip() {
  hepicureSaveSession({ type: 'guest', identity: null, name: 'Guest' });
  window.location.href = 'home.html';
}

/* ---------- called on home.html / subscription.html / track-order.html ---------- */
function hepicureRequireAuth(onReady) {
  const session = hepicureGetSession();
  if (!session) {
    window.location.href = 'login.html';
    return;
  }
  if (typeof onReady === 'function') onReady(session);
}

function hepicureSignOut() {
  localStorage.removeItem(HEPICURE_SESSION_KEY);
  window.location.href = 'login.html';
}

/* ---------- if already signed in, skip straight past login.html ---------- */
function hepicureRedirectIfSignedIn() {
  const session = hepicureGetSession();
  if (session) window.location.href = 'home.html';
}
