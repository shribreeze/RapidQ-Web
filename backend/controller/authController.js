// backend/src/controllers/authController.js
const { signup, login } = require('../firebase/authService');

const signupUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = await signup(email, password);

        // Optionally, save user details in Firestore
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            username,
            email,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({ uid: user.uid, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login(email, password);
        res.status(200).json({ uid: user.uid, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };
