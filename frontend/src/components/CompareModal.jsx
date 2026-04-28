import React from 'react';

const CompareModal = ({ products, onClose }) => {
  if (products.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content compare-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Compare Specs</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {products.map(p => (
            <div key={p.id} className="compare-column">
              <div className="compare-img">
                 {p.image_url ? (
                   <img src={p.image_url} alt={p.name} />
                 ) : (
                   <svg style={{opacity: 0.5}} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                 )}
              </div>
              <h3 style={{marginTop: '1rem', color: 'var(--cyan-primary)'}}>{p.name}</h3>
              <p className="compare-price">${p.price}</p>
              
              <div className="compare-specs">
                <div className="spec-row">
                  <span className="spec-label">Brand</span>
                  <span className="spec-value">{p.brand}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Rating</span>
                  <span className="spec-value">★ {p.rating} / 5</span>
                </div>
                {p.specs && Object.entries(p.specs).map(([k, v]) => (
                  <div className="spec-row" key={k}>
                    <span className="spec-label">{k.toUpperCase()}</span>
                    <span className="spec-value">{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{marginTop: '1.5rem', width: '100%'}} onClick={() => window.open(p.buyLink || '#', '_blank')}>Buy Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
