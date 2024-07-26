// backend/authRoutes.js
const express = require('express');
const { auth } = require('./firebaseAdmin');
const router = express.Router();
const admin = require('firebase-admin');

// Sign-up route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sign-in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.auth().getUserByEmail(email);
        // Firebase Authentication does not support password verification on the server side. 
        // This is typically handled on the client side using Firebase's client SDK.
        // For custom tokens or additional logic, you can use Firebase Custom Authentication.
        res.status(200).json({ uid: user.uid });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
