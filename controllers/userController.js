const User = require('../model/User.js'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

/*
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}
*/


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Construct user data for response
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // Include any other user fields you want to return
    };

    res.status(200).json({ message: "User logged in successfully", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

module.exports = { registerUser,loginUser };
