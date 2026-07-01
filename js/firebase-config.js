// ============================================================
// FIREBASE CONFIG — fill this in with YOUR project's values.
//
// Where to get these:
// 1. Go to https://console.firebase.google.com
// 2. Open your project (or create one)
// 3. Click the gear icon (top left) -> Project settings
// 4. Scroll to "Your apps" -> click the </> (web) icon to
//    register a web app if you haven't already
// 5. Firebase shows you a config object like the one below —
//    copy your real values into it here.
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBkMOItUZinwNfF6RNEt7CXpmVFkTuTaYU",
  authDomain: "hepicure-f72cb.firebaseapp.com",
  projectId: "hepicure-f72cb",
  storageBucket: "hepicure-f72cb.firebasestorage.app",
  messagingSenderId: "166957346396",
  appId: "1:166957346396:web:961a932dd87f83b2e48099"
};

// Initialize Firebase (compat SDK — loaded via <script> tags in the HTML)
// NOTE: Firestore is NOT used here — it requires the Blaze (billing) plan.
// This project runs on Auth only, which is fully free on the Spark plan.
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
