import express from "express";
const app = express();
const port = 5000;
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://real-time-tracker-frontend.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(
    cors({
      origin: "https://real-time-tracker-frontend.vercel.app/",
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
