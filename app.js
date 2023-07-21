const express = require("express");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

const Routes = require("./routes/index.js");
const ProductManager = require("./managers/ProductManager.js");
const productManager = new ProductManager("productos.json");
const filePath = path.join(__dirname, "data", "realTimesProducts.json");


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

app.get("/realTimesProducts", async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "data", "realTimesProducts.json"), "utf-8");
    const realTimesProducts = JSON.parse(data);

    res.render("realTimesProducts", { realTimesProducts });
  } catch (error) {
    console.error("Error al leer el archivo", error);
    res.status(500).json({ error: "Error al obtener la lista de productos" });
  }
});



io.on("connection", (socket) => {
  console.log(`usuario conectado ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("usuario desconectdo");
  });

  socket.on("event", (saludo) => {
    console.log(saludo);
    socket.emit("evento", "hola desde el server");
  });

  socket.on("productAdded", () => {
    io.emit("realTimesProducts", realTime.getProducts());
  });

  socket.on("productsDeleted", () => {
    io.emit("realTimesProducts", []);
  });

  
});

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});