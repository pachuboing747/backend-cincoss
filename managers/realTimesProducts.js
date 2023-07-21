const fs = require("fs").promises;
const path = require("path");

class RealTime {
  constructor(filename) {
    this.filename = filename;
    this.filePath = path.join(__dirname, "../data", this.filename);
  }

  async addProduct(newProduct) {
    try {
      this.realTimesProducts.push(newProduct);

      await fs.writeFile(this.filePath, JSON.stringify(this.realTimesProducts, null, 2));

      io.emit("productAdded", newProduct);

      return true;
    } catch (error) {
      console.error("Error al agregar el producto", error);
      return false;
    }
  }

  async getProducts() {
    const products = await fs.readFile(this.filePath, "utf8");
    let items = JSON.parse(products);

    if (!Array.isArray(items)) {
      items = [];
    }

    return items;
  }

  async deleteProducts() {
    try {
      this.realTimesProducts = [];

      await fs.writeFile(this.filePath, JSON.stringify(this.realTimesProducts, null, 2));

      io.emit("productsDeleted");

      return true;
    } catch (error) {
      console.error("Error al eliminar los productos", error);
      return false;
    }
  }
}

module.exports = RealTime;