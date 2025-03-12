// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOo6tFWMJK7Ceh_idotES68vfRfEDBSrQ",
  authDomain: "login-5a4a9.firebaseapp.com",
  projectId: "login-5a4a9",
  storageBucket: "login-5a4a9.firebasestorage.app",
  messagingSenderId: "96397814548",
  appId: "1:96397814548:web:f18af8b7f679d496213001",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
