import React from 'react';

const MobileNav = ({ currentView, setCurrentView, wishlistCount, compareCount }) => {
  return (
    <div className="mobile-nav">
      <button className={`nav-btn ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </button>
      
      <button className={`nav-btn ${currentView === 'search' ? 'active' : ''}`} onClick={() => { setCurrentView('search'); setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 50); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <span>Search</span>
      </button>

      <button className={`nav-btn ${currentView === 'wishlist' ? 'active' : ''}`} onClick={() => setCurrentView('wishlist')}>
        <div style={{position: 'relative'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
        </div>
        <span>Wishlist</span>
      </button>

      <button className={`nav-btn ${currentView === 'compare' ? 'active' : ''}`} onClick={() => setCurrentView('compare')}>
         <div style={{position: 'relative'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3 9 15"/><path d="M12 3H3v18h18v-9"/><path d="m16 3 5 5-5 5"/></svg>
            {compareCount > 0 && <span className="nav-badge">{compareCount}</span>}
         </div>
        <span>Compare</span>
      </button>

      <button className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`} onClick={() => setCurrentView('profile')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        <span>Profile</span>
      </button>
    </div>
  );
};

export default MobileNav;
