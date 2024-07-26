// firebase.js
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDnDT3fL6zxbeoeXtVYzGZKn8TlFIglSkM",
    authDomain: "quickq-17384.firebaseapp.com",
    databaseURL: "https://quickq-17384-default-rtdb.firebaseio.com",
    projectId: "quickq-17384",
    storageBucket: "quickq-17384.appspot.com",
    messagingSenderId: "897266611569",
    appId: "1:897266611569:web:7a7bec1b6cc6d39250f2d0",
    measurementId: "G-Q3JN96C110"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

