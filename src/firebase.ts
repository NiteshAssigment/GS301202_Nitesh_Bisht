import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAta0IViz3xmtaxVZhd-zWm9HXghOq1cD0",
  authDomain: "gsynergy-9044d.firebaseapp.com",
  projectId: "gsynergy-9044d",
  storageBucket: "gsynergy-9044d.appspot.com",
  messagingSenderId: "897050963066",
//   appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
