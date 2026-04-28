import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './index.css';

const API = 'http://localhost:5000/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="container">
      <header className="app-header">
        {/* Placeholder image for WewO brand as requested */}
        <img 
          src="https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=200&q=80" 
          alt="WewO Logo" 
          className="brand-logo" 
        />
        <h1 className="app-title">WewO</h1>
        <p className="app-subtitle">Premium Cookies & Chocolates</p>
      </header>

      <ProductForm
        onSave={fetchProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />
      
      <ProductList
        products={products}
        onDelete={fetchProducts}
        onEdit={setEditProduct}
      />
    </div>
  );
}
