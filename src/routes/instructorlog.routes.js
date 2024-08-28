const express=require('express')
const InstructorLogController=require('../controllers/instructorlog.controller');

const router=express.Router();

router.get('/getall',InstructorLogController.getAll);
router.get('/getbyid/:id', InstructorLogController.getById);
router.post('/add',InstructorLogController.add);
router.get('/getbyemail/:email', InstructorLogController.getByEmail);

router.put('/update/:id', InstructorLogController.update);
// router.put('/update-password/:id', StudentController.updatePassword);
router.delete('/deletebyid/:id', InstructorLogController.deleteById);
router.put('/update-photo/:id', InstructorLogController.updatePhoto);



module.exports=router;




