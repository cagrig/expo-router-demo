// Import the functions you need from the SDKs you need
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const persistence = getReactNativePersistence(ReactNativeAsyncStorage);


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_fu2RuM0PZNZfG_PrMJt9BOnf8GT9HB8",
  authDomain: "imperion-d0583.firebaseapp.com",
  projectId: "imperion-d0583",
  storageBucket: "imperion-d0583.firebasestorage.app",
  messagingSenderId: "1056621368239",
  appId: "1:1056621368239:web:9e9a8d625d006565fc155a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence
});