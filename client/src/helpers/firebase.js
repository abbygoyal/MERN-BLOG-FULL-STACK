// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "mern-blog-93ce7.firebaseapp.com",
  projectId: "mern-blog-93ce7",
  storageBucket: "mern-blog-93ce7.firebasestorage.app",
  messagingSenderId: "530921341341",
  appId: "1:530921341341:web:c279adc7964c47d1912f74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
