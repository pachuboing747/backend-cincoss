const fs = require("fs").promises;
const path = require("path");

class RealTime {
  #realTimesProducts = [];

  constructor(filename) {
    this.filename = filename;
    this.filepath = path.join(__dirname, "../data", this.filename);
  }

  #readFile = async () => {
    const data = await fs.readFile(this.filepath, "utf-8");

    if (data == "") {
      this.#realTimesProducts = [
        "El archivo se encuentra vacío, por favor, ingrese un producto",
      ];
    } else {
      this.#realTimesProducts = JSON.parse(data);
    }
  };

  #writeFile = async () => {
    const data = JSON.stringify(this.#realTimesProducts, null, 2);
    await fs.writeFile(this.filepath, data);
  };

  async getAll() {
    await this.#readFile();

    return this.#realTimesProducts;
  }

  async getById(id) {
    await this.#readFile();

    return this.#realTimesProducts.find((p) => p.id == id);
  }

  async create(product) {
    await this.#readFile();

    const id = (this.#realTimesProducts[this.#realTimesProducts.length - 1]?.id || 0) + 1;

    const newProduct = {
      id,
      ...product,
    };

    if (
      this.#realTimesProducts[0] ==
      "El archivo se encuentra vacío, por favor, ingrese un producto"
    ) {
      this.#realTimesProducts.pop();
    }

    this.#realTimesProducts.push(newProduct);

    await this.#writeFile();

    return newProduct;
  }

  async save(id, producto) {
    await this.#readFile();

    const existing = await this.getById(id);

    if (!existing) {
      return;
    }

    const { title, description, stock, price, keywords } = producto;

    existing.title = title;
    existing.description = description;
    existing.stock = stock;
    existing.price = price;
    existing.keywords = keywords;

    await this.#writeFile();
  }

  async delete(id) {
    await this.#readFile();

    this.#realTimesProducts = this.#realTimesProducts.filter((p) => p.id != id);

    await this.#writeFile();
  }

  async deleteAll() {
    this.#realTimesProducts = [];
    await this.#writeFile();
  }
}

module.exports = RealTime;