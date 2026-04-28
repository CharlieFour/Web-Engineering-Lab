import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';

export default function ProductForm({ onSave, editProduct, setEditProduct }) {
  const [form, setForm] = useState(
    { name: '', price: '', category: '', stock: '' }
  );

  useEffect(() => {
    if (editProduct) setForm(editProduct);
  }, [editProduct]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await axios.put(`${API}/${editProduct._id}`, form);
        setEditProduct(null);
      } else {
        await axios.post(API, form);
      }
      setForm({ name: '', price: '', category: '', stock: '' });
      onSave();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Ensure the backend is running and MongoDB is connected.");
    }
  };

  return (
    <div className="form-container">
      <h2>{editProduct ? '✨ Edit Sweet Treat' : '✨ Add New Delight'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Product Name</label>
          <input 
            className="form-control"
            name='name'     
            placeholder='e.g., Triple Choco Chunk'     
            value={form.name}     
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Price (Rs.)</label>
          <input 
            className="form-control"
            type="number"
            name='price'    
            placeholder='e.g., 250'    
            value={form.price}    
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select 
            className="form-control"
            name='category' 
            value={form.category} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Select category</option>
            <option value="Cookie">Cookie</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Brownie">Brownie</option>
            <option value="Gift Box">Gift Box</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Stock Available</label>
          <input 
            className="form-control"
            type="number"
            name='stock'    
            placeholder='e.g., 50'    
            value={form.stock}    
            onChange={handleChange} 
          />
        </div>
        
        <div className="btn-group">
          <button type='submit' className="btn btn-primary">
            {editProduct ? 'Update Product' : 'Add to Collection'}
          </button>
          {editProduct && (
            <button type='button' className="btn btn-secondary" onClick={() => setEditProduct(null)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
