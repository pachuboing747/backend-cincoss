const {Router} = require ("express");
const path = require ("path");
const ProductManager = require("../../managers/ProductManager");
const productManager = new ProductManager("productos.json")
const CartsManager = require ("../../managers/CartsManager")
const cartsManager = new CartsManager("cart.json")
const router = Router()

router.get("/", async (req, res)=>{
    // res.sendFile(path.join(__dirname, "../../public/index.html"))
    const products = await productManager.getProducts()
    res.render("home", {
        title: "Dario",
        products,
        style: "home"

    })
})

router.get("/carrito", async(req, res)=>{
    // res.sendFile(path.join(__dirname, "../../public/carrito.html"))
    const carrito = await cartsManager.getProducts()
    res.render("carrito", {
        title: "Victoria",
        carrito,
        style: "carrito"
    })
})

router.get("/realtimesProducts", (req, res)=>{
    // res.sendFile(path.join(__dirname, "../../public/carrito.html"))
    res.render("realTimeProducts", {
        title: "Leon",
        style: "carrito"
    })
})
module.exports = router;