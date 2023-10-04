const mongoose = require("mongoose")
const bcrypt = require('bcrypt')// alternate use bcryptjs
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pics: {
            type: String,
            default: "/18942381.jpg"
        }
    },
    {
        timestamps: true,
    }
)
userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw error;
    }
}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model("user", userSchema);

module.exports = User;