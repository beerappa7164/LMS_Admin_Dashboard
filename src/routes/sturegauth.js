const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../model/student.model');

// Register route
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Validate input data
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  const existingUser = await Student.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new Student({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ msg: 'User registered successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
