import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [keyword, setKeyword] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  const logoutHandler = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo" aria-label="AmazonClone Home">
          <span className="logo-text">amazon</span>
          <span className="logo-clone">clone</span>
        </Link>

        {/* Search Bar */}
        <form className="header__search" onSubmit={submitHandler}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="header__search-btn" aria-label="Search">
            <FiSearch />
          </button>
        </form>

        {/* Navigation */}
        <nav className="header__nav">
          {/* Cart */}
          <Link to="/cart" className="header__nav-item cart-link" aria-label={`Shopping cart with ${cartCount} items`}>
            <FiShoppingCart className="nav-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="user-menu-wrapper" onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
              <button className="header__nav-item user-menu-btn">
                <FiUser className="nav-icon" />
                <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                <FiChevronDown className="chevron" />
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-item user-info">
                    <span className="user-fullname">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                  <button onClick={logoutHandler} className="dropdown-item logout-btn">
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header__nav-item login-btn">
              <FiUser className="nav-icon" />
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;