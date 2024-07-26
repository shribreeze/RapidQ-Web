// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
