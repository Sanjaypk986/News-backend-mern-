const express = require('express')
const { login, verifyLogin, logout } = require('../controllers/authController')
const router = express.Router()

const cors = require('cors');

// Allow only specific origin and credentials
const corsOptions = {
  origin: 'https://fresh-feed.vercel.app',
  credentials: true
};
// Apply CORS middleware with options
router.use(cors(corsOptions));

router.post('/login', login)
router.get('/verify', verifyLogin)
router.get('/logout',logout)


module.exports = router