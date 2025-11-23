require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./products");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB, seeding products...");

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
