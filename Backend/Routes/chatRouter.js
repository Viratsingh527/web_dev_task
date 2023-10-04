const express = require('express')
const protect = require('../middleware/authMiddleware')
const { accessChat, fetchChats, createGroupchat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController')
const chatRouter = express.Router();


chatRouter
    .route('/')
    .get(protect, fetchChats)
    .post(protect, accessChat)

chatRouter
    .route('/group')
    .post(protect, createGroupchat)

chatRouter
    .route('/rename')
    .put(protect, renameGroup)

chatRouter
    .route('/groupadd')
    .put(protect, addToGroup)

chatRouter
    .route('/groupremove')
    .put(protect, removeFromGroup)

module.exports = chatRouter