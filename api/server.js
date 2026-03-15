import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


// ===== PRODUCTOS =====

const products = [
{
id:1,
title:"Guía práctica de Evaluación Psicopedagógica",
price:19000
},
{
id:2,
title:"Kit de Informes Psicopedagógicos",
price:24000
},
{
id:3,
title:"Cuadernillo de Técnicas de Intervención",
price:22000
}
];


// ===== RUTA PRINCIPAL =====

app.get("/", (req, res) => {
  res.send("API Rincón Psicope funcionando");
});


// ===== OBTENER PRODUCTOS =====

app.get("/products", (req, res) => {
  res.json(products);
});


// ===== CHECKOUT =====

app.post("/checkout", (req, res) => {

  const { cart } = req.body;

  console.log("Carrito recibido:", cart);

  res.json({
    success: true,
    message: "Checkout recibido correctamente"
  });

});


// ===== SERVIDOR =====

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});