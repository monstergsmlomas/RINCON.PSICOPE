import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ===== PRODUCTOS =====

let products = [
  {
    id: 1,
    title: "Guía práctica de Evaluación Psicopedagógica",
    price: 19000
  },
  {
    id: 2,
    title: "Kit de Informes Psicopedagógicos",
    price: 24000
  },
  {
    id: 3,
    title: "Cuadernillo de Técnicas de Intervención",
    price: 22000
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

// ===== CREAR PRODUCTO =====

app.post("/products", (req, res) => {
  const { title, price } = req.body;

  const newProduct = {
    id: Date.now(),
    title,
    price
  };

  products.push(newProduct);

  res.json({ success: true, product: newProduct });
});

// ===== EDITAR PRODUCTO =====

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (title) product.title = title;
  if (price) product.price = price;

  res.json({ success: true, product });
});

// ===== ELIMINAR PRODUCTO =====

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.filter(p => p.id !== id);

  res.json({ success: true });
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