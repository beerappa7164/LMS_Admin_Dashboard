// const BaseController=require('./base.controller')
// const InstructorLogRepository=require('../repositories/instructorlog.repositories');

// class InstructorLogController extends BaseController
// {
//     constructor()
//     {
//         super(InstructorLogRepository)
//     }
// };

// module.exports=new InstructorLogController();









const BaseController=require('./base.controller')
const InstructorLogRepository=require('../repositories/instructorlog.repositories');
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

class InstructorLogController extends BaseController {
    constructor() {
        super(InstructorLogRepository);
    }

    // add = (req, res) => {
    //     upload(req, res, async (err) => {
    //         if (err) {
    //             return res.status(500).json({ error: err.message });
    //         }

    //         console.log('Request Body:', req.body);
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             password,
    //             votes,
                
    //             price,
               
    //             technologyName,
    //             ratings,
    //             location,
    //             aboutMe,
    //             timings, 
    //             experience,
    //             education,
    //         } = req.body;

    //         let photoUrl = '';
    //         if (req.file) {
    //             try {
    //                 const result = await new Promise((resolve, reject) => {
    //                     const uploadStream = cloudinary.uploader.upload_stream({
    //                         public_id: uuidv4(),
    //                         resource_type: 'auto' 
    //                     }, (error, result) => {
    //                         if (error) {
    //                             reject(error);
    //                         } else {
    //                             resolve(result);
    //                         }
    //                     });
    //                     streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    //                 });

    //                 photoUrl = result.secure_url;
    //                 console.log('Uploaded photo URL:', photoUrl);
    //             } catch (uploadError) {
    //                 return res.status(500).json({ error: uploadError.message });
    //             }
    //         }

    //         const formattedTimings = {
    //             Monday: [],
    //             Tuesday: [],
    //             Wednesday: [],
    //             Thursday: [],
    //             Friday: [],
    //             Saturday: [],
    //             Sunday: []
    //         };

    //         if (timings) {
    //             Object.keys(timings).forEach(day => {
    //                 if (formattedTimings[day] !== undefined) {
    //                     formattedTimings[day] = timings[day][0].split(',').map(time => time.trim());
    //                 }
    //             });
    //         }

    //         console.log('Formatted Timings:', formattedTimings);

    //         try {
    //             const newInstructor = await this.repo.create({
    //               firstName,
    //               lastName,
    //                email,
    //                 password,
    //                 votes,
    //                 price,
                    
    //                 technologyName,
    //                 ratings,
    //                 photoUrl,
    //                 location,
    //                 aboutMe,
    //                 experience,
    //                 education,
    //                 timings: formattedTimings,
    //             });
    //             res.status(201).json(newInstructor);
    //         } catch (error) {
    //             res.status(500).json({ error: error.message });
    //         }
    //     });
    // }


    updatePhoto = (req, res) => {
        upload(req, res, async (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
    
          if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
          }
    
          try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  public_id: uuidv4(),
                  resource_type: 'auto',
                },
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );
              streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
            });
    
            const photoUrl = result.secure_url;
    
            // Update photo URL in the admin profile
            const updatedInstructorlog = await this.repo.update(req.params.id, { photoUrl });
    
            res.status(200).json(updatedInstructorlog);
          } catch (uploadError) {
            return res.status(500).json({ error: uploadError.message });
          }
        });
      };
}

module.exports = new InstructorLogController();








