const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const SERVER_URL = "http://localhost:4000/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const sendPage = (file) => (req, res) =>
  res.sendFile(path.join(__dirname, "public", file));

app.get("/", sendPage("index.html"));
app.get("/index", sendPage("index.html"));
app.get("/add-product", sendPage("add-product.html"));
app.get("/update-product", sendPage("update-product.html"));
app.get("/delete-product", sendPage("delete-product.html"));
app.get("/list-products", sendPage("list-products.html"));
app.get("/search-product", sendPage("search-product.html"));

// Client API -> Backend API
app.get("/api/products", async (req, res) => {
  try {
    const response = await fetch(`${SERVER_URL}/products`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: "Backend server is not available." });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const response = await fetch(`${SERVER_URL}/products/${encodeURIComponent(req.params.id)}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: "Backend server is not available." });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const response = await fetch(`${SERVER_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: "Backend server is not available." });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const response = await fetch(`${SERVER_URL}/products/${encodeURIComponent(req.params.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: "Backend server is not available." });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const response = await fetch(`${SERVER_URL}/products/${encodeURIComponent(req.params.id)}`, {
      method: "DELETE"
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({ message: "Backend server is not available." });
  }
});

app.listen(PORT, () => {
  console.log(`Client server running at http://localhost:${PORT}`);
});
