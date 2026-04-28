import axios from 'axios';

const API = 'http://localhost:5000/api/products';

export default function ProductList({ products, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this sweet treat?')) {
      try {
        await axios.delete(`${API}/${id}`);
        onDelete();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  // Helper to assign a random placeholder image based on category if needed
  // We use reliable Unsplash source for bakery/chocolate themes
  const getImageUrl = (category, index) => {
    const defaultImages = [
      'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=400&q=80', // cookies
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80', // chocolate
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80', // mix
      'https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=400&q=80' // brownie
    ];
    return defaultImages[index % defaultImages.length];
  };

  return (
    <div>
      <div className="products-header">
        <h2>Our Collection</h2>
        <span>{products.length} {products.length === 1 ? 'item' : 'items'}</span>
      </div>
      
      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No treats available right now.</h3>
          <p>Use the form above to add some delicious cookies or chocolates to the store!</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p, index) => (
            <div key={p._id} className="product-card">
              <div 
                className="product-image-placeholder" 
                style={{ backgroundImage: `url(${getImageUrl(p.category, index)})` }}
              >
                <span className="product-badge">{p.category}</span>
              </div>
              
              <div className="product-content">
                <h3 className="product-title">{p.name}</h3>
                <div className="product-price">Rs. {p.price}</div>
                
                <div className="product-details">
                  <span><strong>Stock:</strong> {p.stock} units</span>
                  <span><strong>ID:</strong> {p._id.slice(-6)}</span>
                </div>
                
                <div className="product-actions">
                  <button className="btn btn-secondary" onClick={() => onEdit(p)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
