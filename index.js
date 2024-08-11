import express from "express";
const app = express();
const port = 5000;
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";




dotenv.config({
  path: "./.env",
});
console.log(process.env.REACT_APP_SERVER)

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_SERVER,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(
    cors({
      origin: process.env.REACT_APP_SERVER,
    })
);


app.get("/", (req, res) => {
  res.send("hey boy");
});

io.on("connection", (socket) => {
  console.log(`user connect with ${socket.id}`);

    socket.on("send-location", (data) => {
      console.log(data.latitude, data.longitude)
      io.emit("recive-location", { id: socket.id, ...data })
    });

  socket.on("disconnect", () => {
    io.emit("leave",{id:socket.id})
    console.log(`user disconnect which have socket id ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
