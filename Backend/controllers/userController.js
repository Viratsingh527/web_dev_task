const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')
const generateToken = require('../config/generateToken')
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pics } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please fill all fields')
    }

    const userexits = await User.findOne({ email })
    // console.log(userexits)
    if (userexits) {
        res.status(200).json({
            _id: null
        })
        // throw new Error('User already exits')
    }
    else {
        const user = await User.create({ name, email, password, pics })

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pics: user.pics,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error('Failed to create user')
        }
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })// i  did something extra

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pics: user.pics,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid email_id or password')
    }

})

const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
        ],
    } : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }).select('-password')
    if (users.length > 0) {
        // console.log(keyword)
        res.send(users)
    }
    else {
        res.status(400).send('unable to find')

    }

})
module.exports = { registerUser, authUser, allUser };