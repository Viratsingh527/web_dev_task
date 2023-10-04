const express = require('express')

const userRouter = express.Router();
const { registerUser, authUser, allUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');


userRouter
    .route('/')
    .get(protect, allUser)
    .post(registerUser)
userRouter
    .route('/login')
    .post(authUser)




module.exports = { userRouter }