const Driver = require('../model/Driver.js'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerDriver(req, res) {
  try {
    const { name, email, password, phoneNumber, licenseNumber, vehicle } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new Driver({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      licenseNumber,
      vehicle,
    });

    const savedDriver = await newDriver.save();

    res.status(201).json({ message: "Driver registered successfully", driver: savedDriver });
  } catch (error) {
    res.status(500).json({ message: "Error registering driver", error: error.message });
  }
}

async function loginDriver(req, res) {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ driverId: driver._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token created at:', new Date().toISOString());
    console.log('Token expires at:', new Date(Date.now() + 3600000).toISOString()); 
    

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
function logoutDriver(req, res) {
  console.log('The token has expired or the user logged out');
  res.status(200).json({ message: 'The token has expired or the user logged out. Please handle logout on the client side.' });
}


// async function loginDriver(req, res) {
//   try {
//     const { email, password } = req.body;
//     const driver = await Driver.findOne({ email });

//     if (!driver) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, driver.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Construct driver data for response
//     const driverData = {
//       _id: driver._id,
//       name: driver.name,
//       email: driver.email,
//       phoneNumber: driver.phoneNumber,
//       licenseNumber: driver.licenseNumber,
//       vehicle: driver.vehicle,
//       isActive: driver.isActive,
     
//     };

//     res.status(200).json({ message: "Driver logged in successfully", driver: driverData });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// }

module.exports = { registerDriver, loginDriver , logoutDriver};

// //module.exports = { registerDriver };
