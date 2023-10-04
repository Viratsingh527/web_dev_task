const mongoose = require("mongoose")

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        latestMassage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "massage"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model('chat', chatModel)

module.exports = Chat;