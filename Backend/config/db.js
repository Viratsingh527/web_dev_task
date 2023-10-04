const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true,
        })
        console.log(`Mongodb connected :${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;