// app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Use CORS to allow requests from frontend
app.use(cors({ origin: process.env.CORS_ORIGIN }));
const apiRoutes = require('./src/routes/api.routes');
app.use(express.json());

// Your existing routes and middleware this is for student login
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Your existing routes and middleware this is for student login
const adminauthRoutes = require('./src/routes/adminauth');
app.use('/api/adminauth', adminauthRoutes);
app.use('/api', apiRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










