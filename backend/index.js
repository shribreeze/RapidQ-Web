// backend/src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
