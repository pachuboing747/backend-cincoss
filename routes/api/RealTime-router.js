const { Router } = require("express")

const RealTime = require("../../managers/realTimesProducts");
const realTime = new RealTime("realTimesProducts.json");

const router = Router();

router.post("/addProduct", async (req, res) => {
    const { title, price } = req.body;
  
    try {
      await realTime.create({ title, price });
      res.sendStatus(200);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      res.sendStatus(500);
    }
});

router.get("/getProducts", async (req, res) => {
  try {
    const products = await realTime.getAll();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
    res.sendStatus(500);
  }
});


router.post("/deleteProducts", async (req, res) => {
  try {
    await realTime.deleteAll();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al eliminar los productos:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
