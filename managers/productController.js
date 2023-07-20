const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");

const filePath = path.join(__dirname, "data", "realTimesProducts.json");

let productList = [];

function readProductsFromFile() {
  try {
    const data = fs.readFileSync(filePath);
    productList = JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo", error);
  }
}

function saveProductsToFile() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(productList));
  } catch (error) {
    console.error("Error al guardar los productos en el archivo", error);
  }
}

function createProduct(newProduct) {
  productList.push(newProduct);
  saveProductsToFile();
}

function deleteProduct(productId) {
  productList = productList.filter((product) => product.id !== productId);
  saveProductsToFile();
}

function initSocketIO(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");

    socket.emit("initialProducts", productList);

    socket.on("createProduct", (newProduct) => {
      createProduct(newProduct);
      io.emit("newProductCreated", newProduct);
    });

    socket.on("deleteProduct", (productId) => {
      deleteProduct(productId);
      io.emit("productDeleted", productId);
    });

    socket.on("disconnect", () => {
      console.log("Un cliente se ha desconectado");
    });
  });
}

module.exports = {
  readProductsFromFile,
  createProduct,
  deleteProduct,
  initSocketIO,
};
