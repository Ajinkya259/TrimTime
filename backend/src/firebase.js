// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKRbbIbzcPqf-Ju6g7_kP8UbXVDK_uVHM",
  authDomain: "trimtime-fad68.firebaseapp.com",
  projectId: "trimtime-fad68",
  storageBucket: "trimtime-fad68.appspot.com",
  messagingSenderId: "55249194979",
  appId: "1:55249194979:web:bc605ae2941f641dc35ad6",
  measurementId: "G-PDJNBMCD43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);