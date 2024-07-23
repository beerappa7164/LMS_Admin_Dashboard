// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to handle student registration
router.post('/register', studentController.registerStudent);

module.exports = router;
