require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

// ===== AUTH ROUTES =====
app.use("/api/auth", authRoutes);

// ===== PRODUCT ROUTES =====

// Get ALL products from MongoDB
app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Get single product
app.get("/api/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

// ===== 404 handler =====
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// ===== Error handler (JSON) =====
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
