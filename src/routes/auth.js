const express = require('express');
const router = express.Router();
const Student = require('../model/student.model');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email }).exec();

    // If student not found
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await student.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login successful, return success message and student details
    res.json({ message: 'Login successful', student });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
