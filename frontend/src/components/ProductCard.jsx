import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="product-card">
      
      {/* PRODUCT IMAGE */}
      <div className="product-img-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
      </div>

      {/* PRODUCT CONTENT */}
      <div className="product-info">
        <Link
          to={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
        </Link>
      </div>

      <button className="product-button" onClick={() => onAddToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
