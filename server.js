const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1:27017/supermarket";

app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "products");

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Tharunya Supermarket API is running." });
});

// LIST ALL
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ productId: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve products.", error: error.message });
  }
});

// GET ONE
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    if (!Number.isInteger(productId)) {
      return res.status(400).json({ message: "Product ID must be a number." });
    }

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: "Product not found." });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve the product.", error: error.message });
  }
});

// ADD
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create({
      productId: Number(req.body.productId),
      name: req.body.name,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      category: req.body.category
    });
    res.status(201).json({ message: "Product added successfully.", product });
  } catch (error) {
    const duplicate = error.code === 11000;
    res.status(duplicate ? 409 : 400).json({
      message: duplicate ? "Product ID already exists." : "Unable to add product.",
      error: error.message
    });
  }
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const update = {
      name: req.body.name,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
      category: req.body.category
    };

    const product = await Product.findOneAndUpdate(
      { productId },
      update,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product updated successfully.", product });
  } catch (error) {
    res.status(400).json({ message: "Unable to update product.", error: error.message });
  }
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const product = await Product.findOneAndDelete({ productId });

    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product deleted successfully.", product });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete product.", error: error.message });
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected: supermarket");
    app.listen(PORT, () => console.log(`Backend server running at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
