import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Rincón Psicope funcionando");
});

app.post("/checkout", (req, res) => {

  const { cart } = req.body;

  console.log("Carrito recibido:", cart);

  res.json({
    success: true,
    message: "Checkout recibido correctamente"
  });

});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});