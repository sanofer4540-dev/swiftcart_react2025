// BackEnd/products.js

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    description: "Over-ear Bluetooth headphones with noise isolation.",
    image: "/images/headphones.jpg",   // 👈 note: starts with /
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Classic T-Shirt",
    price: 19.99,
    description: "Soft cotton t-shirt for everyday comfort.",
    image: "/images/tshirt.jpg",       // 👈
    category: "Clothing",
    inStock: true,
  },
  {
    id: 3,
    name: "Blue Denim Jeans",
    price: 49.99,
    description: "Regular fit blue jeans with comfortable stretch.",
    image: "/images/jeans.jpg",        // 👈
    category: "Clothing",
    inStock: true,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 129.99,
    description: "Track steps, heart rate, and notifications.",
    image: "/images/smartwatch.jpg",   // 👈
    category: "Electronics",
    inStock: true,
  },
  {
    id: 5,
    name: "Running Sneakers",
    price: 69.99,
    description: "Lightweight sneakers designed for daily running.",
    image: "/images/sneakers.jpg",     // 👈
    category: "Footwear",
    inStock: true,
  },
  {
    id: 6,
    name: "Leather Handbag",
    price: 59.99,
    description: "Elegant leather handbag with zipper compartments.",
    image: "/images/bag.jpg",          // 👈
    category: "Bags",
    inStock: true,
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 79.99,
    description: "Wireless earbuds with charging case and touch control.",
    image: "/images/earbuds.jpg",      // 👈
    category: "Electronics",
    inStock: true,
  },
  {
    id: 8,
    name: "Stainless Steel Pot",
    price: 39.99,
    description: "Durable stainless steel pot with lid.",
    image: "/images/pot.jpg",          // 👈
    category: "Home & Kitchen",
    inStock: true,
  },
];

module.exports = products;
