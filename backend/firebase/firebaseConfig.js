// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnDT3fL6zxbeoeXtVYzGZKn8TlFIglSkM",
    authDomain: "quickq-17384.firebaseapp.com",
    projectId: "quickq-17384",
    storageBucket: "quickq-17384.appspot.com",
    messagingSenderId: "897266611569",
    appId: "1:897266611569:web:7a7bec1b6cc6d39250f2d0",
    measurementId: "G-Q3JN96C110"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
