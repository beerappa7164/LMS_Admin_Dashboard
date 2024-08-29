






const BaseController = require('./base.controller');
const AdminRepository = require('../repositories/admin.repository');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('photoUrl');

class AdminController extends BaseController {
  constructor() {
    super(AdminRepository);
  }

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
        const updatedAdmin = await this.repo.update(req.params.id, { photoUrl });

        res.status(200).json(updatedAdmin);
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }
    });
  };
}

module.exports = new AdminController();
