// backend/firebase/authService.js
const { auth } = require('./firebaseConfig');

async function signup(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(`Signup failed: ${error.message}`);
    }
}

async function login(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
}

module.exports = { signup, login };
