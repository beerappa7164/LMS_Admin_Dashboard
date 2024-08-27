// const BaseController=require('./base.controller')
// const StudentRepository=require('../repositories/student.repository');

// class StudentController extends BaseController
// {
//     constructor()
//     {
//         super(StudentRepository)
//     }
// };

// module.exports=new StudentController;





const BaseController=require('./base.controller')
const StudentRepository=require('../repositories/student.repository');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('photoUrl');

class StudentController extends BaseController {
    constructor() {
        super(StudentRepository);
    }

    add = (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            console.log('Request Body:', req.body);
            const {
                firstName,
                lastName,
                email,
                password,
                phoneNo,
                location,
                role,
                enrolledCourses,
               
            } = req.body;

            let photoUrl = '';
            if (req.file) {
                try {
                    const result = await new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream({
                            public_id: uuidv4(),
                            resource_type: 'auto' 
                        }, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
                    });

                    photoUrl = result.secure_url;
                    console.log('Uploaded photo URL:', photoUrl);
                } catch (uploadError) {
                    return res.status(500).json({ error: uploadError.message });
                }
            }

           

            

            try {
                const newInstructor = await this.repo.create({
                  firstName,
                  lastName,
                   email,
                    password,
                   
                    photoUrl,
                    location,
                    role,
                    phoneNo,
                    enrolledCourses,
                    
                });
                res.status(201).json(newInstructor);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}

module.exports = new StudentController();








