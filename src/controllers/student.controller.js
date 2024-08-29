








const BaseController = require('./base.controller');
const StudentRepository = require('../repositories/student.repository');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('photoUrl');

const otpStorage = {}; // In-memory OTP storage for simplicity
const generateOTP = () => Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

class StudentController extends BaseController {
  constructor() {
    super(StudentRepository);
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

        // Update photo URL in the student profile
        const updatedStudent = await this.repo.update(req.params.id, { photoUrl });
        res.status(200).json(updatedStudent);
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }
    });
  };

  sendEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOTP();
    otpStorage[email] = otp;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'beerappakoraba145@gmail.com',

        pass:'aiwh vyhp mroj yvwn', // Use environment variables for sensitive information
      },
    });

    const mailOptions = {
      from: 'beerappakoraba145@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `Your OTP for resetting your password is: ${otp}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully', response: info.response });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  };

  verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    if (otpStorage[email] && otpStorage[email] === parseInt(otp)) {
      delete otpStorage[email];
      res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  };

  resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    try {
      const user = await this.repo.findOne({ email }); // Adjust repository method as needed
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
      await user.save();

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
  };
}

module.exports = new StudentController();
