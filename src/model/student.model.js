



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, minlength: 4 },
  lastName: { type: String,  minlength: 4 },
  email: { type: String,  unique: true, lowercase: true },
  password: { type: String,  minlength: 8 },
  originalPassword: { type: String }, // Field to store original password (not recommended for production)
  phoneNo: { type: String, minlength: 10,  },
  adress: { type: String },
  role: { type: String, default: 'student' },
  avatar: { type: String, default: 'avatar.webp' },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, { versionKey: false, timestamps: true });

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
