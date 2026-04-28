import React from 'react';
import ProductCard from './ProductCard';

const HorizontalList = ({ title, items, actions }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="horizontal-section">
      <div className="section-header" style={{ marginBottom: '1.5rem', padding: '0 5%' }}>
        <h2>{title}</h2>
      </div>
      <div className="slider-container">
        <div className="slider-track">
          {items.map(product => (
            <div className="slider-item" key={product.id}>
              <ProductCard 
                product={product} 
                isInWishlist={actions.wishlist.some(p => p.id === product.id)}
                isInCompare={actions.compareList.some(p => p.id === product.id)}
                onToggleWishlist={() => actions.toggleWishlist(product)}
                onToggleCompare={() => actions.toggleCompare(product)}
                onView={() => actions.viewProduct(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalList;
