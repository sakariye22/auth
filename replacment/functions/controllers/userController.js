require('dotenv').config();
const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist } = require('../middlewware/authenticate-token');

async function registerUser(req, res) {
    const { name, email, password } = req.body; 

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const result = await user.save();

        res.status(201).json({ message: 'User registered successfully', userId: result.id  }); 
    } catch (error) {
        console.error(error);
        console.error('Registration error:', error);

        if (error.name === 'MongoServerError' && error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).send('Server Error');
    }
};


module.exports = { registerUser };
