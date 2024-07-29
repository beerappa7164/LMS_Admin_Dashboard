// const mongoose=require('mongoose')

// const Schema=mongoose.Schema;

// const courseSchema=new Schema({
//     courseName:{type:String,required:true},
//     author:{type:String,required:true},
//     courseRating:{type:String,required:true},
//     courseImg:{type:String,required:true},
//     coursePrice:{type:Number,required:true},
//     isPaidCourse:{type:Boolean,required:true,default:true},
//     description:{type:String,required:true},
//     courseLink:{type:String,required:true},
//     tabCourseDescription:{type:String,required:true},
//     tabCourseReview:{type:String,required:true},
//     tabCourseDiscussion:{type:String,required:true},
//     tabCourseResources: {
//       type: [
//         {
//           resourceName: { type: String },
//           resourceLink: { type: String },
//         },
//       ],
//       required: true,
//       default: [],
//     },
//     courseIndex:{type:[
//         {
//         sectionName:{type:String,required:true},
//         chapterName:{type:[],required:true,default:[]},
//         videoLinks:{type:[],required:true,default:[]}
//         },
//     ],required:true,default:[]},
    
// },{versionKey:false,timestamps:true})

// const Course=mongoose.model('Course',courseSchema);
// module.exports=Course;



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  paid: { type: Boolean, required: true, default: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  reviews: { type: String, required: true },
  discussion: { type: String, required: true },
  resources: { type: String, required: true },
  videoLinks: { type: [String], required: true },
  chapters: [
    {
      chapterTitle: { type: String, required: true },
      sections: { type: [String], required: true }
    }
  ]
}, { versionKey: false, timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
