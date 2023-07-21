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

router.get("/realTimesProducts", async(req, res)=>{

    const realTimesProducts = await realTimeManager.getProducts()
    res.render("realTimesProducts", {
        title: "RealTimesProducts",
        realTimesProducts,
        style: "carrito"
    })
    
})
router.post("/addProduct", async (req, res) => {
    const newProduct = req.body; 
    await realTimeManager.addProduct(newProduct); 
    res.redirect("/realTimesProducts");  
});

router.post("/deleteProduct", async (req, res) => {
    const productId = req.body.productId; 
    await realTimeManager.deleteProduct(productId); 
    res.redirect("/realTimesProducts"); 
});




  
module.exports = router;