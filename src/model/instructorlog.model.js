


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const instructorlogSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  phoneNo: { type: String, minlength: 10 },
  adress: { type: String },
}, { versionKey: false, timestamps: true });

instructorlogSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Instance method to compare password
instructorlogSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const InstructorLog = mongoose.model('InstructorLog', instructorlogSchema);
module.exports = InstructorLog;
