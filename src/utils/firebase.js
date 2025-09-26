import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-fe050.firebaseapp.com",
  projectId: "mern-auth-fe050",
  storageBucket: "mern-auth-fe050.firebasestorage.app",
  messagingSenderId: "88721038000",
  appId: "1:88721038000:web:9fc922dbe1b7dd49d17975",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
