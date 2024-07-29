


const express = require('express');
const router = express.Router();
const Admin = require('../model/admin.model');

// Route for registering a new student
router.post('/adminregister', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    // Create a new student instance with the provided data
    console.log(req.body)
    const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        password,
        
    });

    try {
        // Save the new student to the database
        await Admin.create(newAdmin)
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to register admin' });
    }
});

module.exports = router;
