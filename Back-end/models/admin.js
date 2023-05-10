const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({  
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters'],
      },

  adminRole:{
    type: Boolean,
    default: true,
  }
  
});


//fire a function before doc saved to db
adminSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
adminSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  //check email
  //if(!user) return res.status(400).send("Invalid email or password");
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
 // throw Error('incorrect email');
};

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;