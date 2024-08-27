const express = require('express');
const InstructorLogController = require('../controllers/instructorlog.controller');
const router = express.Router();

// Image upload route
router.post('/upload-image', upload.single('photoUrl'), (req, res, next) => {
  InstructorLogController.uploadImage(req, res, next);
});

module.exports = router;
