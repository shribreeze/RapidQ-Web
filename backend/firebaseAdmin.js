// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('/Users/divyanshuagarwal/Desktop/QuickQ web/quickq-17384-firebase-adminsdk-nbl85-d96d300616.json'); // Path to your Firebase Admin SDK service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = { auth };
