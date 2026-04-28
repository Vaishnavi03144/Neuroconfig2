import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, toggleWishlist, toggleCompare, viewProduct, wishlist = [], compareList = [] }) => {
  if (!products || products.length === 0) {
    return <div className="error">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product, idx) => (
        <ProductCard 
          key={product.id || idx} 
          product={product} 
          isInWishlist={wishlist.some(p => p.id === product.id)}
          isInCompare={compareList.some(p => p.id === product.id)}
          onToggleWishlist={() => toggleWishlist(product)}
          onToggleCompare={() => toggleCompare(product)}
          onView={() => viewProduct(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
