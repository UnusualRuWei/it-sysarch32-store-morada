// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxxv-e30UYknnRf2DZxNvh_xMFrOfBRyo",
  authDomain: "it-sysarch32-store-morada.firebaseapp.com",
  projectId: "it-sysarch32-store-morada",
  storageBucket: "it-sysarch32-store-morada.appspot.com",
  messagingSenderId: "659051249682",
  appId: "1:659051249682:web:8695c26e739a93619318cb",
  measurementId: "G-8BVEL295CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fdb = getFirestore(app);
export const storage = getStorage(app);



