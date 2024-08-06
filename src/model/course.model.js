
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  paid: { type: Boolean, required: true, default: true },
  description: { type: String, required: true },
  tabdescription: { type: String, required: true },
  videoUrl: { type: String, required: true },
  reviews: { type: String},
  discussion: { type: String, required: true },
  resources: { type: String, required: true },
  videoLinks: { type: [String], required: true },
  cy: { type: String, required: true }
 
}, { versionKey: false, timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
