


const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
const Schema=mongoose.Schema;

const adminSchema=new Schema({
    firstName:{type:String,required:true,minlength:4},
    lastName:{type:String,required:true,minlength:4},
    
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true,minlength:8,maxlength:20},
    phoneNo: { type: String, minlength: 10},
    location: { type: String,default:'null' },
    photoUrl: { type: String,default:'https://res.cloudinary.com/di8docqfs/image/upload/v1724652624/orman_a893tq.jpg'},
  
    aboutMe: { type: String, default: 'null' },
    education: { type: String, default: 'null'},
    role:{type:String,default:'admin'},
    
},{
    versionKey:false,
    timestamps:true,
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      this.originalPassword = this.password; // Store the original password
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  });

  adminSchema.pre('findOneAndUpdate', async function(next) {
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

  adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

const admin=mongoose.model('admin',adminSchema);
module.exports=admin;