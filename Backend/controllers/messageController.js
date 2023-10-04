const asyncHandler = require('express-async-handler')
const Chat = require('../Model/chatModel')
const User = require('../Model/userModel')
const Message = require('../Model/massageModel')



const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body
    if (!content || !chatId) {
        console.log('invalid data passed')
        return res.sendStatus(400)
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }
    try {
        var message = await Message.create(newMessage)
        message = await message.populate('sender', 'name pics')
        message = await message.populate('chat')
        // message = await Message.populate(message, 'sender chat');
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name email pics'
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMassage: message._id
        })
        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const Allmessage = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name pics email').populate('chat')
        res.json(messages)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
module.exports = { sendMessage, Allmessage }