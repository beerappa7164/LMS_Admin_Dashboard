


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  technologyName: { type: String },
  ratings: { type: Number, default: 0 },
  location: { type: String },
  photoUrl: { type: String },
  timings: {
    Monday: { type: [String], default: [] },
    Tuesday: { type: [String], default: [] },
    Wednesday: { type: [String], default: [] },
    Thursday: { type: [String], default: [] },
    Friday: { type: [String], default: [] },
    Saturday: { type: [String], default: [] },
    Sunday: { type: [String], default: [] }
  },
  aboutMe: { type: String },
  price: { type: Number, default: 0 },
  votes: { type: Number, default: 0 }
}, { versionKey: false, timestamps: true });

instructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

instructorSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});


instructorSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
