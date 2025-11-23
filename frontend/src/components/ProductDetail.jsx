import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams(); // read product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <button className="back-button" onClick={() => navigate("/products")}>
  ← Back
</button>


        <div className="product-detail-content">
          {product.image && (
            <div className="product-detail-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-detail-image"
              />
            </div>
          )}

          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="detail-price">${product.price.toFixed(2)}</p>

            {product.category && (
              <p className="detail-category">
                <strong>Category:</strong> {product.category}
              </p>
            )}

            <p className="detail-description">{product.description}</p>

            <button
              className="product-button"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
