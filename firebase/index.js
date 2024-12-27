// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC0RE1L9_7uRHh-DqcE2Uiqsa-ZTpgKQ8s",
  authDomain: "libertalia-properties-623a9.firebaseapp.com",
  databaseURL: "https://libertalia-properties-623a9-default-rtdb.firebaseio.com",
  projectId: "libertalia-properties-623a9",
  storageBucket: "libertalia-properties-623a9.firebasestorage.app",
  messagingSenderId: "511383415117",
  appId: "1:511383415117:web:3cc66f2edb2ef7d5936f04",
  measurementId: "G-C2K2L7LH55"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

async function getToken(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  console.log("Token:", token);
}

//getToken("your-email@example.com", "your-password");

export { auth, db };

export default app;