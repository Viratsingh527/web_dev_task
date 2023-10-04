const express = require('express');
const protect = require('../middleware/authMiddleware');
const { sendMessage, Allmessage } = require('../controllers/messageController');


const router = express.Router();

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, Allmessage)

module.exports = router

