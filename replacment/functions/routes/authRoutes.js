const express = require ('express');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const { authenticateToken, tokenBlacklist} = require ('../middlewware/authenticate-token.js')

const {registerDriver,loginDriver, protectedDriver} = require ('../controllers/driverController.js');

const {registerUser} = require ('../controllers/userController.js');



router.post('/register/driver', registerDriver);
router.post('/login/driver', loginDriver);
router.get ('/protected', authenticateToken, protectedDriver)

router.post ('/register/user',registerUser);

module.exports = router;