
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZHbJbJgHTNpJBAG-acgPG5bFhHg80maY",
  authDomain: "haihub.firebaseapp.com",
  projectId: "haihub",
  storageBucket: "haihub.appspot.com",
  messagingSenderId: "893173778762",
  appId: "1:893173778762:web:41bd35657a7dfb8f4c59b3",
  measurementId: "G-PQGYFN6CR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

