import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';

const app = express();

const server = createServer(app);

const io = new Server(server , {
    cors:{
        origin:"https://real-t-ime-chat-app-frontend.vercel.app/",
        methods:["GET" , "PUT"],
        credentials:true,
    }
})

io.on("connection" ,(socket)=>{
    console.log("User Connected", socket.id);

    socket.on("join_room",({name , room})=>{
        socket.join(room);
        console.log(name , " " , room);
    })

    socket.on("send-message" , (messageData)=>{
        console.log(messageData);
        socket.to(messageData.room).emit("recieve-message" , messageData);
    })
})

const port = 3000;

server.listen(port , ()=>{
    console.log(`Servre is running on http://localhost:${port}`);
})
