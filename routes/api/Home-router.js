const {Router} = require ("express");
const path = require ("path");
const fs = require ("fs/promises")
const ProductManager = require("../../managers/ProductManager");
const productManager = new ProductManager("productos.json")
const CartsManager = require ("../../managers/CartsManager")
const cartsManager = new CartsManager("cart.json")
const filePath = path.join(__dirname, "data", "realTimesProducts.json");

const router = Router()


router.get("/", async (req, res)=>{

    const products = await productManager.getProducts()
    res.render("home", {
        title: "Productos",
        products,
        style: "home"

    })
})

router.get("/carrito", async(req, res)=>{

    const carrito = await cartsManager.getProducts()
    res.render("carrito", {
        title: "Carrito",
        carrito,
        style: "carrito"
    })
})


  
module.exports = router;