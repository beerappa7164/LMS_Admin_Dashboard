// const BaseController=require('./base.controller')
// const CourseRepository=require('../repositories/course.repository')

// class CourseController extends BaseController
// {
//     constructor()
//     {
//         super(CourseRepository)
//     }
// }

// module.exports=new CourseController;









const BaseController = require('./base.controller');
const CourseRepository = require('../repositories/course.repository');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('image');

class CourseController extends BaseController {
  constructor() {
    super(CourseRepository);
  }

  add = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(500).json({ error: err.message });
      }

      const {
        title,
        author,
        price,
        description,
        videoUrl,
        reviews,
        discussion,
        resources,
        paid,
        videoLinks,
        chapters
      } = req.body;

      const courseImg = req.file ? `uploads/${req.file.filename}` : '';

      try {
       
        const parsedChapters = JSON.parse(chapters);
        const newCourse = await this.repo.create({
          title,
          author,
          image: courseImg,
          price,
          description,
          videoUrl,
          reviews,
          discussion,
          resources,
          paid,
          videoLinks: Array.isArray(videoLinks) ? videoLinks : [videoLinks],
          chapters: Array.isArray(parsedChapters) ? parsedChapters : [parsedChapters]
        });
        res.status(201).json(newCourse);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }
}

module.exports = new CourseController();
