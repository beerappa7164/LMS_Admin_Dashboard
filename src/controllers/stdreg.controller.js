// controllers/studentController.js

const Student = require('../models/student');

// Existing functions...

// New function to handle student registration
exports.registerStudent = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Validate the input
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new student
        const newStudent = new Student({
            firstname,
            lastname,
            email,
            password
        });

        // Save the student to the database
        await newStudent.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
