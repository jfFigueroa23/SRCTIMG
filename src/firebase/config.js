// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAr5rl4cx4ksA2zHUvRZOy2OmSkS1a8e5s",
    authDomain: "project-gallardo.firebaseapp.com",
    projectId: "project-gallardo",
    storageBucket: "project-gallardo.appspot.com",
    messagingSenderId: "875799694570",
    appId: "1:875799694570:web:da3d76adffcf5daa9b9b93"
};

// Initialize Firebase
export const Firebaseapp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( Firebaseapp );
export const FirebaseBD   = getFirestore( Firebaseapp )


