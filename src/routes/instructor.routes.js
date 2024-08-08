const express=require('express')
const InstructorController=require('../controllers/instructor.controller');

const router=express.Router();

router.get('/getall',InstructorController.getAll);
router.get('/getbyid/:id', InstructorController.getById);
router.post('/add',InstructorController.add);
router.get('/getbyemail/:email', InstructorController.getByEmail);
router.get('/getbyusername/:userName',InstructorController.getByUserName)
router.put('/update/:id', InstructorController.update);


router.delete('/deletebyid/:id', InstructorController.deleteById);




module.exports=router;




