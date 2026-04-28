import React from 'react';

const ProductCard = ({ product, isInWishlist, isInCompare, onToggleWishlist, onToggleCompare, onView }) => {
  return (
    <div className="product-card" onClick={onView}>
      <div className="product-image">
      <img
  src={
    product.image_url ||
    (product.category === "Laptop"
      ? "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
      : product.category === "Smartphone"
      ? "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800"
      : product.category === "Headphones"
      ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
      : "https://via.placeholder.com/400x300?text=Neuroconfig")
  }
  alt={product.name}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/400x300?text=Neuroconfig";
  }}
/>  
        {product.discount && (
          <div className="product-badge">{product.discount} OFF</div>
        )}

        <div className="card-actions">
          <button className={`action-btn ${isInWishlist ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }} title="Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          <button className={`action-btn ${isInCompare ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onToggleCompare(); }} title="Compare">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 3 9 15"/><path d="M12 3H3v18h18v-9"/><path d="m16 3 5 5-5 5"/></svg>
          </button>
        </div>
      </div> 

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          ★ {product.rating || "4.8"} ({product.reviews || Math.floor(Math.random() * 500) + 50} reviews)
        </div>

        <div className="product-specs">
          {product.specs ? (
            <ul>
              {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
              ))}
            </ul>
          ) : (
             <p>{product.description?.substring(0, 80)}...</p>
          )}
        </div>

        <div className="product-footer">
          <div className="product-price">
            ${product.price}
          </div>
          <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); window.open(product.buyLink || '#', '_blank'); }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
