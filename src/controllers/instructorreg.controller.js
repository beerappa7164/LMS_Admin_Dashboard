// controllers/studentController.js

const InstructorLog = require('../models/instructorlog');

// Existing functions...

// New function to handle student registration
exports.registerInstructor = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Validate the input
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new student
        const newInstructor = new Instructor({
            firstname,
            lastname,
            email,
            password
        });

        // Save the student to the database
        await newInstructor.save();

        res.status(201).json({ message: 'Instructor registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
