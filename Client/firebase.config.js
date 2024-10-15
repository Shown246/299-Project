// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3t4Iyo3xQ1vCKSmNrHVytJacHlKuKWRg",
  authDomain: "project-38724.firebaseapp.com",
  projectId: "project-38724",
  storageBucket: "project-38724.appspot.com",
  messagingSenderId: "987028300480",
  appId: "1:987028300480:web:5c94b1e0de915a1187c325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;