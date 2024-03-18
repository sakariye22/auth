const Driver = require ('../model/Driver.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist} = require ('../middlewware/authenticate-token.js');

async function registerDriver(req, res) {
    try {
        const { name, email, password, phone_number } = req.body;
        console.log("Received registration request:", req.body);

        if (!name || !email || !password || !phone_number) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingDriver = await Driver.findOne({ email: email });
        if (existingDriver) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDriver = new Driver({
            name,
            email,
            password: hashedPassword,
            phone_number,
        });

        const savedDriver = await newDriver.save();
        console.log("Driver registered:", savedDriver);

        res.status(201).json({ message: "Driver registered successfully", driver: savedDriver });
    } catch (error) {
        console.error("Error in registerDriver:", error);
        res.status(500).json({ message: "Error registering driver", error: error.message });
    }
};

async function loginDriver(req, res) {
    try {
        const { email, password } = req.body;

        const driver = await Driver.findOne({ email: email });
        if (!driver) return res.status(401).json({ message: 'Driver not found' });

        const isValid = await bcrypt.compare(password, driver.password);
        if (!isValid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: driver.id, role: 'driver' }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Authentication successful', token });
    } catch (error) {
        console.error("Error in loginDriver:", error);
        res.status(500).json({ message: "Error logging in driver", error: error.message });
    }
};
async function protectedDriver (req,res){
    res.json('hello world');
}


  module.exports = {registerDriver, loginDriver, protectedDriver};  