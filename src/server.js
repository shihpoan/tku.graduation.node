const http = require("http");
const io = require("socket.io");

//測試socket連接用
const client_io = require("socket.io-client");

const app = require("./app");
const client_socket = client_io("http://localhost:3001/water");
const { mongoConnect } = require("./service/mongo");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

const waterNameSpace = socketServer.of("water");
app.io = waterNameSpace;

waterNameSpace.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  client_socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  //TODO: 測試接收使用
  client_socket.on("dataUpdated", () => {
    console.log("dataUpdated");
    // io.emit('chat message', msg);
  });
});

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
  // socket.listen(socketServer);
}

startServer();
