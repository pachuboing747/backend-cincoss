const express = require("express");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

const Routes = require("./routes/index.js");
const realTimesProductsRouter = require("./routes/api/RealTime-router.js"); 
const RealTime = require("./managers/realTimesProducts");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname + "/public")));

app.use("/", Routes.home);
app.use("/realTimesProducts", realTimesProductsRouter)

const realTime = new RealTime("realTimesProducts.json");


io.on("connection", (socket) => {
  console.log(`usuario conectado ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("usuario desconectdo");
  });

  socket.on("event", (saludo) => {
    console.log(saludo);
    socket.emit("evento", "hola desde el server");
  });

  socket.on("productAdded", async () => {
    const products = await realTime.getAll();
    io.emit("realTimesProducts", products);
  });

  socket.on("productsDeleted", async () => {
    await realTime.deleteAll();
    const products = await realTime.getAll();
    io.emit("realTimesProducts", products);
  });

  
});

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});