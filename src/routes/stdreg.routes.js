



const express = require('express');
const router = express.Router();
const Student = require('../model/student.model');

// Route for registering a new student
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phoneNo, adress } = req.body;
    
    const newStudent = new Student({
        firstName,
        lastName,
        email,
        password,
        phoneNo,
        adress
    });

    try {
        await Student.create(newStudent);
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to register student' });
    }
});

module.exports = router;

