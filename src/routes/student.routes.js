const express=require('express')
const StudentController=require('../controllers/student.controller');

const router=express.Router();

router.get('/getall',StudentController.getAll);
router.get('/getbyid/:id', StudentController.getById);
router.post('/add',StudentController.add);
router.get('/getbyemail/:email', StudentController.getByEmail);
router.get('/getbyusername/:userName',StudentController.getByUserName)
router.put('/update/:id', StudentController.update);
// router.put('/update-password/:id', StudentController.updatePassword);
router.delete('/deletebyid/:id', StudentController.deleteById);
router.put('/update-password/:id', StudentController.updatePassword);



module.exports=router;




