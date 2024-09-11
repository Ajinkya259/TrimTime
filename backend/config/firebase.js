import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDKRbbIbzcPqf-Ju6g7_kP8UbXVDK_uVHM",
  authDomain: "trimtime-fad68.firebaseapp.com",
  projectId: "trimtime-fad68",
  storageBucket: "trimtime-fad68.appspot.com",
  messagingSenderId: "55249194979",
  appId: "1:55249194979:web:bc605ae2941f641dc35ad6",
  measurementId: "G-PDJNBMCD43"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
