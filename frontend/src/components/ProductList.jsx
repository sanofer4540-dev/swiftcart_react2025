import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="product-page">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="product-page error-text">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="product-page">
      <h2 className="product-page-title">Featured Products</h2>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
