import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const checkoutHandler = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-outline">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item__image" />
                <div className="cart-item__details">
                  <Link to={`/product/${item.product}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <span className="cart-item__price">${item.price}</span>
                </div>
                <div className="cart-item__quantity">
                  <label htmlFor={`qty-${item.product}`} className="visually-hidden">Quantity</label>
                  <select
                    id={`qty-${item.product}`}
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    className="quantity-select"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="cart-item__line-total">
                  ${(item.qty * item.price).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="cart-item__remove"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>${subtotal}</span>
            </div>
            <button
              onClick={checkoutHandler}
              className="btn btn-primary checkout-btn"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;