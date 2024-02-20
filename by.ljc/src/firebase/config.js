// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfi_vAW_-uXtIbng6eBgxeiH7JBh5Mq9A",
  authDomain: "by-ljc.firebaseapp.com",
  projectId: "by-ljc",
  storageBucket: "by-ljc.appspot.com",
  messagingSenderId: "444810582930",
  appId: "1:444810582930:web:834cfee05c2a5c25d0bf4b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const projectStorage = getStorage();

const projectFirestore = getFirestore(app);

export { projectFirestore, projectStorage };