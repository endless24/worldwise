// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk_IPLvoiIWAnaV1Xq0Jk2mtvFimuJRN4",
  authDomain: "worldwise-loginauth.firebaseapp.com",
  projectId: "worldwise-loginauth",
  storageBucket: "worldwise-loginauth.appspot.com",
  messagingSenderId: "135856702248",
  appId: "1:135856702248:web:220939d5ddf7ba1b77061d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// export const db = getFirestore(app);
export { app, auth };
