

// Import the functions you need from the SDKs you need
import exp from "constants";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0HrIEF8bnAs40iMlfek9dhIyQLI1eERc",
  authDomain: "guesthouse-5f9fa.firebaseapp.com",
  projectId: "guesthouse-5f9fa",
  storageBucket: "guesthouse-5f9fa.firebasestorage.app",
  messagingSenderId: "109969214343",
  appId: "1:109969214343:web:47c6bc6a102e47ab6ca122"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;