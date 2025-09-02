const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city:   { type: String },
  state:  { type: String },
  zip:    { type: String },
  country: { type: String }
}, { _id: false });

const userSchema = new mongoose.Schema({
  firstName:   { type: String, required: true, trim: true },
  lastName:    { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"] 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    match: [/^\+\d{10,15}$/, "Please enter a valid phone number with country code"] 
  },
  country:     { type: String, required: true },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  address:     { type: addressSchema },
  refreshToken: { type: String }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive fields when converting to JSON
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
