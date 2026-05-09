import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-80c44.firebaseapp.com",
  projectId: "loginonecart-80c44",
  storageBucket: "loginonecart-80c44.firebasestorage.app",
  messagingSenderId: "360942319222",
  appId: "1:360942319222:web:7a5b1ced8b181fc0379157",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
