const asyncHandler = require('express-async-handler')

const Chat = require('../Model/chatModel')
const User = require('../Model/userModel')

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log("user params is not send with request")
        res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]

    }).populate("users", "-password").populate('latestMassage')

    isChat = await User.populate(isChat, {
        path: "latestMassage.sender",
        select: "name pics email",
    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],

        }

        try {
            const createChat = await Chat.create(chatData)

            const FullChat = await Chat.findOne({ _id: createChat._id }).populate('users', '-password')
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMassage')
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMassage.sender",
                    select: "name pics email",
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupchat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        res.status(400).send({ message: "please fill the all fields" })
    }
    var users = JSON.parse(req.body.users)
    if (users.length < 2) {
        res.status(400).send({ message: "more than two users are required" })
    }

    else {
        users.push(req.user)
        try {
            const createdChat = await Chat.create({
                isGroupChat: true,
                chatName: req.body.name,
                users: users,
                groupAdmin: req.user
            })
            const fullGroupChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password').populate('latestMassage').populate('groupAdmin', '-password')
            res.status(200).send(fullGroupChat)

        } catch (error) {
            res.status(400).send(error.message)
        }
    }

})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, {
        new: true,
    }).populate("users", "-password").populate("groupAdmin", "-password")
    if (!updatedChat) {
        res.status(400)
        throw new Error("failed to update data")
    } else {
        res.status(200).send(updatedChat)
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body
    const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true }).populate('users', '-password').populate('groupAdmin', '-password')

    if (!added) {
        res.status(400)
        throw new Error("failed to add users")
    } else {
        res.status(200).send(added)
    }
})


const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body
    const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true }).populate('users', '-password').populate('groupAdmin', '-password')

    if (!removed) {
        res.status(400)
        throw new Error("failed to add users")
    } else {
        res.status(200).send(removed)
    }
})

module.exports = { accessChat, fetchChats, createGroupchat, renameGroup, addToGroup, removeFromGroup }