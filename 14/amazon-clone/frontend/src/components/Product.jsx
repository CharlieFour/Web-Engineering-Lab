import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card__body">
        <Link to={`/product/${product._id}`} className="product-card__name">
          {product.name}
        </Link>
        <div className="product-card__rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="reviews">({product.numReviews})</span>
        </div>
        <div className="product-card__price">${product.price}</div>
      </div>
    </div>
  );
};

export default Product;