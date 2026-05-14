import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__sections">
          <div className="footer__section">
            <h4>Get to Know Us</h4>
            <ul>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">About AmazonClone</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Make Money with Us</h4>
            <ul>
              <li><Link to="/">Sell products</Link></li>
              <li><Link to="/">Affiliate Program</Link></li>
              <li><Link to="/">Advertise Your Products</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Let Us Help You</h4>
            <ul>
              <li><Link to="/">Your Account</Link></li>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><Link to="/">Help</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {year} AmazonClone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;