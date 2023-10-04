const mongoose = require("mongoose")


const massageModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        content: {
            type: String, trim: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat"
        }
    },
    {
        timestamps: true,
    }
)

const massage = mongoose.model("massage", massageModel)

module.exports = massage; 