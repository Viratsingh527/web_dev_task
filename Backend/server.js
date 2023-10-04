const express = require('express')
const app = express()
const colors = require("colors")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config();
// const chats = require('./Data/data')
const connectDB = require('./config/db')
const { userRouter } = require('./Routes/userRouters')
const messageRouter = require('./Routes/messageRouter')
const { Notfound, ErrorHandler } = require("./middleware/errormidleware");
const chatRouter = require('./Routes/chatRouter');
connectDB();




app.use(express.json());
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.use('/api/chat', chatRouter)

// ------------deloyment----------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(__dirname1, 'frontend', 'build', 'index.html')
    })
}
else {
    app.get('/', (req, res) => {
        res.send("App is successefully runninng")
    })

}
// ------------deloyment----------------

app.use(Notfound)
app.use(ErrorHandler)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`.yellow.bold)
})

const io = require('socket.io')(server, {
    pingTimeout: 6000000,
    cors: {
        origin: "http://localhost:3000",
    }
})
io.on('connection', (socket) => {
    // console.log('connected to socket.io')

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log(userData.name)
        socket.emit('connected')
    })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined the room ' + room)
    })
    socket.on('typing', (room) => { socket.in(room).emit("typing") })
    socket.on('stop typing', (room) => { socket.in(room).emit('stop typing') })
    socket.on('newMessage', (newMessage) => {
        console.log(newMessage.content)
        try {
            var chat = newMessage.chat;
            if (!chat.users) {
                console.log('chat.users is not defined');
                return;
            }

            chat.users.forEach(user => {
                if (user._id === newMessage.sender._id) return;
                socket.in(user._id).emit('messageReceived', newMessage); // Use io.to() to broadcast to all clients in the room.
            });
        } catch (error) {
            console.error('Error in newMessage event:', error);
        }
    });
})