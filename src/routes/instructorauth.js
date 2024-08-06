



const express = require('express');
const router = express.Router();
const InstructorLog = require('../model/instructorlog.model');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const instructor = await InstructorLog.findOne({ email }).exec();
    if (!instructor) { // Corrected the check here
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await instructor.comparePassword(password); // Call the instance method
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', instructor });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
