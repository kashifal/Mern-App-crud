const mongoose =  require("mongoose");
const  { Schema } =  require("mongoose");



const userSchema = new Schema({
  email: {
    type: String,
    required: true, // The field is required (email should not be empty)
    unique: true, // The field should be unique (no two users can have the same email)
    trim: true, // Removes any leading/trailing whitespace from the email
    lowercase: true, // Converts the email to lowercase before saving
    validate: {
      validator: function (value) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  }, 
  password: {type:String},  
  role: {type:String},  
});

const User = mongoose.model('User', userSchema);
module.exports = User;