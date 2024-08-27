// const AdminRepository = require('../repositories/admin.repository');
// const BaseController = require('./base.controller');

// class AdminController extends BaseController {
//     constructor() {
//         super(AdminRepository);
//     }
// }

// module.exports = new AdminController();





const BaseController=require('./base.controller')
const AdminRepository = require('../repositories/admin.repository')
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

class AdminController extends BaseController {
    constructor() {
        super(AdminRepository);
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
                aboutMe,
                role,
                education,
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
                const newAdmin = await this.repo.create({
                  firstName,
                  lastName,
                   email,
                    password,
                    role,
                    
                    photoUrl,
                    location,
                    aboutMe,
                    phoneNo,
                    education,
                    
                });
                res.status(201).json(newAdmin);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}

module.exports = new AdminController();








