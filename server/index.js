const express = require('express');

const { createServer } = require("http");
const { Server } = require("socket.io");
const { webUserRoutes } = require('./router/webUserRoute');
const { dbConnect } = require('./config/db');
require('dotenv').config()
const app = express();

const httpServer = createServer(app);
const cors = require('cors')



dbConnect()

app.use(express.json())
app.use(cors());




// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {

//     //her client connect oldugunda buraya düşer
//     console.log('Socket ', socket.id);

//     //socket.on listener ile mesaj bekliyoruz
//     socket.on("chat", (data) => {
//          io.to(data.id).emit("chatmessage", data.message)
//     })


// });

app.use('/api/webuser', webUserRoutes)


httpServer.listen(5000);

