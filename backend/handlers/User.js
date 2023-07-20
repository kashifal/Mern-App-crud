const userModel = require('../models/UserModel');
const { createJWT, hashPassword } = require('../modules/Auth');
const bcrypt = require('bcrypt');
 
exports.createUser = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'This Emai already exists , Login' });
    }

    // Hash the password
    const hashedPassword = hashPassword(req.body.password);

    // Create a new user instance
    const newUser = new userModel({
      email: req.body.email,
      password: await hashedPassword,  
      role:req.body.role
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token for the new user
    const token = createJWT(newUser);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};






exports.signin = async (req, res) => {
  try {
    // Check if the user exists based on the email provided
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

    if (isPasswordValid) {
      // Passwords match, user is authenticated.
      // Here, you can generate and return a JWT token.
      const token = createJWT(existingUser);

    res.json({ token });
      res.json({ message: 'User authenticated' });
    } else {
      // Passwords do not match, user is not authenticated.
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while signing in' });
  }
};
