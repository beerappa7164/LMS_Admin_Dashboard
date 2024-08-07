


// const BaseController = require('./base.controller');
// const InstructorRepository = require('../repositories/instructor.repository');
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single('photoUrl');

// class InstructorController extends BaseController {
//   constructor() {
//     super(InstructorRepository);
//   }

//   add = (req, res) => {
//     upload(req, res, async (err) => {
//       if (err) {
//         console.error("Multer Error:", err);
//         return res.status(500).json({ error: err.message });
//       }

//       const {
//         firstName,
//         lastName,
//         email,
//         password,
//         phoneNo,
//         adress,
//         mentorName,
//         technologyName,
//         ratings,
//         location,
//         aboutMe,
//         price,
//         votes,
//         timings,
//       } = req.body;

//       const mentorImg = req.file ? `uploads/${req.file.filename}` : '';

//       const formattedTimings = {
//         Monday: [],
//         Tuesday: [],
//         Wednesday: [],
//         Thursday: [],
//         Friday: [],
//         Saturday: [],
//         Sunday: []
//     };
//     if (timings) {
//         Object.keys(timings).forEach(day => {
//             if (formattedTimings[day] !== undefined) {
//                 formattedTimings[day] = timings[day][0].split(',').map(time => time.trim());
//             }
//         });
//     }
//     console.log('Formatted Timings:', formattedTimings);

//       try {
//         const newMentors = await this.repo.create({
//           firstName,
//           lastName,
//           email,
//           password,
//           phoneNo,
//           adress,
//           mentorName,
//           technologyName,
//           ratings,
//           location,
//           aboutMe,
//           price,
//           votes,
//           timings:formattedTimings,
//           photoUrl: mentorImg,
//         });
//         res.status(201).json(newMentors);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });
//   }
// }

// module.exports = new InstructorController();







const BaseController = require('./base.controller');
const InstructorRepository = require('../repositories/instructor.repository');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('photoUrl');

class InstructorController extends BaseController {
  constructor() {
    super(InstructorRepository);
  }

  add = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({ error: err.message });
      }

      const {
        
        firstName,
        lastName,
        email,
        password,
        technologyName,
        ratings,
        location,
        aboutMe,
        price,
        votes,
        timings,
      } = req.body;

      // Log the received data
      console.log('Received Data:', req.body);

    

      const mentorImg = req.file ? `uploads/${req.file.filename}` : '';

      const formattedTimings = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
      };
      if (timings) {
        Object.keys(timings).forEach(day => {
          if (formattedTimings[day] !== undefined) {
            formattedTimings[day] = timings[day][0].split(',').map(time => time.trim());
          }
        });
      }

      console.log('Formatted Timings:', formattedTimings);

      try {
        const newMentors = await this.repo.create({
         
         
          firstName,
          lastName,
          email,
          password,
          technologyName,
          ratings,
          location,
          aboutMe,
          price,
          votes,
          timings: formattedTimings,
          photoUrl: mentorImg,
        });
        res.status(201).json(newMentors);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}

module.exports = new InstructorController();
