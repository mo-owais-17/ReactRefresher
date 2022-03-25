// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwZbAyjbHW8wdNCs5_ifw5Ld_n883nZtQ",
  authDomain: "task-1-19d6b.firebaseapp.com",
  projectId: "task-1-19d6b",
  storageBucket: "task-1-19d6b.appspot.com",
  messagingSenderId: "547946207350",
  appId: "1:547946207350:web:1a22a2bab7ec50af416757",
  measurementId: "G-39WFHDTFSE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
