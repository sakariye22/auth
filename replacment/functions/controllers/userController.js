require('dotenv').config();
const User = require('../model/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require('../middlewware/authenticate-token');

const mongoDB = process.env.MONGODB_URL; 


    async function registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            console.log("Received registration request:", req.body);
    
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Missing required fields" });
            }
    
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({ message: "Email already in use" });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });
    
            const savedUser = await newUser.save();
            console.log("User registered:", savedUser);
    
            res.status(201).json({ message: "User registered successfully", user: savedUser });
        } catch (error) {
            console.error("Error in registerUser:", error);
            res.status(500).json({ message: "Error registering user", error: error.message });
        }
    };
    
    async function loginUser(req, res) {
        try {
            const { email, password } = req.body;
    
            const user = await User.findOne({ email: email });
            if (!user) return res.status(401).json({ message: 'User not found' });
    
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return res.status(401).json({ message: 'Invalid password' });
    
            // Generate a token with the user's ID and role
            const token = jwt.sign({ id: user.id, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    
            // Include the user's name in the response. Assuming the user's name is stored in `user.name`
            res.json({
                message: 'Authentication successful',
                token: token,
                userName: user.name // Include this line to send the user's name in the response
            });
        } catch (error) {
            console.error("Error in loginUser:", error);
            res.status(500).json({ message: "Error logging in user", error: error.message });
        }
    };
    

module.exports = { registerUser , loginUser , protectedUser};
