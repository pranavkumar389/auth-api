const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoute = require('./routes/auth');
const privateRoute = require('./routes/privateRoute');

dotenv.config();

// Connect DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connected to DB');
});

// Middleware
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/private', privateRoute);

app.listen(3000, () => console.log('Server started at port 3000'))