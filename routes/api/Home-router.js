const {Router} = require ("express");
const path = require ("path");
const ProductManager = require("../../managers/ProductManager");
const productManager = new ProductManager("productos.json")
const CartsManager = require ("../../managers/CartsManager")
const cartsManager = new CartsManager("cart.json")
const router = Router()

router.get("/", async (req, res)=>{

    const products = await productManager.getProducts()
    res.render("home", {
        title: "Dario",
        products,
        style: "home"

    })
})

router.get("/carrito", async(req, res)=>{

    const carrito = await cartsManager.getProducts()
    res.render("carrito", {
        title: "Victoria",
        carrito,
        style: "carrito"
    })
})

router.get("/realtimesProducts", async (req, res)=>{
    const realtimesProducts = await productManager.getProducts()
    res.render("realTimeProducts", {
        title: "Leon",
        realtimesProducts,
        style: "carrito"
    })
})
module.exports = router;