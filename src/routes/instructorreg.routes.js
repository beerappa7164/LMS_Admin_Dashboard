



const express = require('express');
const router = express.Router();
const InstructorLog = require('../model/instructorlog.model');

// Route for registering a new student
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phoneNo, adress } = req.body;
    
    const newInstructorLog = new InstructorLog({
        firstName,
        lastName,
        email,
        password,
        phoneNo,
        adress
    });

    try {
        await InstructorLog.create(newInstructorLog);
        res.status(201).json({ message: 'Instructor registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to register instructor' });
    }
});

module.exports = router;

