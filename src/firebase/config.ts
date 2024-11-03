// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxlhDpRVuA1vIQM87DD4XAXueBl6VfcI",
  authDomain: "astro-auth-alegreiff.firebaseapp.com",
  projectId: "astro-auth-alegreiff",
  storageBucket: "astro-auth-alegreiff.firebasestorage.app",
  messagingSenderId: "960810423111",
  appId: "1:960810423111:web:6280c495760ebf985b3262"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase =  {app, auth}

