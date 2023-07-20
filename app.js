const express = require ("express");
const fs = require ("fs/promises");
const http = require ("http")
const path = require ("path")
const handlebars = require ("express-handlebars")
const {Server} = require("socket.io")

const Routes = require ("./routes/index.js");
const ProductManager = require ("./managers/ProductManager.js")
const productManager = new ProductManager ("productos.json")

const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname,"/views"))
app.set("view engine", "handlebars")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use ("/public", express.static(path.join(__dirname + "/public")))

app.use("/", Routes.home)


app.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    let data = await fs.readFile('products.json', 'utf-8');
    let cartList = JSON.parse(data);

    const cartIndex = cartList.findIndex((item) => item.cid === cid);

    if (cartIndex !== -1) {
      const cart = cartList[cartIndex];
      const existingProduct = cart.products.find((item) => item.product === pid);

      const newProductId = cart.products.length + 1;
      const newProduct = { id: newProductId, product: pid, quantity: 1 };
      cart.products.push(newProduct);
    } else {
  
      const newProduct = { id: 1, product: pid, quantity: 1 };
      const newCart = { cid, products: [newProduct] };
      cartList.push(newCart);
    }

    data = JSON.stringify(cartList, null, 2);
    await fs.writeFile('products.json', data, 'utf-8');

    res.json(cartList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

io.on("connection", (socket)=>{
  console.log(`usuario conectado ${socket.id}`);

  socket.on("disconnect", ()=>{
    console.log("usuario desconectdo");
  })

  socket.on("event", (saludo)=>{
    console.log(saludo);
    socket.emit("evento", "hola desde el server")
  })
  
})

const port = 8080;
server.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});

