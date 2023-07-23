const {Router} = require ("express");
const path = require ("path");
const fs = require ("fs/promises")
const ProductManager = require("../../managers/ProductManager");
const productManager = new ProductManager("productos.json")
const CartsManager = require ("../../managers/CartsManager")
const cartsManager = new CartsManager("cart.json")
const RealTime = require ("../../managers/realTimesProducts")
const realTimeManager = new RealTime("realTimesProducts.json")

const router = Router()



router.get("/", async (req, res)=>{

    const products = await productManager.getAll()
    res.render("home", {
        title: "Productos",
        products,
        style: "home"

    })
})

router.get("/carrito", async(req, res)=>{

    const carrito = await cartsManager.getAll()
    res.render("carrito", {
        title: "Carrito",
        carrito,
        style: "carrito"
    })
})

router.get("/realTimesProducts", async(req, res)=>{

    const realTimesProducts = await realTimeManager.getAll()
    res.render("realTimesProducts", {
        title: "RealTimesProducts",
        realTimesProducts,
        style: "carrito"
    })
    
})






  
module.exports = router;