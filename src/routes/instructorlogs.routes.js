const express = require('express');
const router = express.Router();
const InstructorLogController = require('../controllers/instructorlog.controller');

router.post('/add', InstructorLogController.add);
router.patch('/updatePhoto/:id', InstructorLogController.updatePhoto);

module.exports = router;
