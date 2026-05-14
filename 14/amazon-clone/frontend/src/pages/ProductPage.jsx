import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import CartContext from '../context/CartContext';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-page">
      <Link to="/" className="back-link">
        <FiArrowLeft /> Back to Results
      </Link>

      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="rating">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="reviews">({product.numReviews} reviews)</span>
          </div>
          <p className="description">{product.description}</p>
        </div>

        <div className="product-action">
          <div className="price">${product.price}</div>
          <div className={`stock ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </div>

          {product.countInStock > 0 && (
            <div className="quantity">
              <label htmlFor="qty-select">Qty:</label>
              <select
                id="qty-select"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={addToCartHandler}
            className="btn btn-primary add-to-cart-btn"
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? 'Not Available' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;