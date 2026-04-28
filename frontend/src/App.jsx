import productsData from "./products.json";
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Chatbot from './components/Chatbot';
import CompareModal from './components/CompareModal';
import MobileNav from './components/MobileNav';
import HorizontalList from './components/HorizontalList';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for search, filter and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  // States for features
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("neuro_wishlist") || "[]"));
  const [recentlyViewed, setRecentlyViewed] = useState(() => JSON.parse(localStorage.getItem("neuro_recent") || "[]"));
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  // Mobile nav view state
  const [currentView, setCurrentView] = useState("home"); // home, search, wishlist, compare, profile

  useEffect(() => {
    try {
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("neuro_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("neuro_recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const toggleCompare = (product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 2) return [prev[1], product]; // Keep max 2
      return [...prev, product];
    });
  };

  const viewProduct = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 5); // Keep last 5
    });
    // Can hook up to a product details page later
  };

  // Derive filtered sorting
  let filteredProducts = products;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (category !== "All") {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (brand !== "All") {
    filteredProducts = filteredProducts.filter(p => p.brand === brand);
  }

  if (minPrice !== "") {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice !== "") {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
  }

  if (minRating > 0) {
    filteredProducts = filteredProducts.filter(p => (p.rating || 0) >= minRating);
  }

  if (sortBy === "price-low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  // Derived sections
  const trendingProducts = [...products].sort((a, b) => ((b.rating || 0) * (b.reviews || 0)) - ((a.rating || 0) * (a.reviews || 0))).slice(0, 5);
  const studentPicks = products.filter(p => p.tags && p.tags.some(t => ['student', 'coding', 'budget'].includes(t.toLowerCase()))).slice(0, 5);

  const allBrands = ["All", ...new Set(products.map(p => p.brand).filter(Boolean))];

  return (
    <div className="app-container">
      <Navbar />
      <main style={{ paddingBottom: '80px' }}>
        {currentView === "home" || currentView === "search" ? (
          <>
            <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {searchQuery === "" && currentView === "home" && !loading && !error && (
              <>
                <HorizontalList title="🔥 Trending Products" items={trendingProducts} actions={{ toggleWishlist, toggleCompare, viewProduct, wishlist, compareList }} />
                <HorizontalList title="🎓 Best Student Picks" items={studentPicks} actions={{ toggleWishlist, toggleCompare, viewProduct, wishlist, compareList }} />
                {recentlyViewed.length > 0 && (
                  <HorizontalList title="👀 Recently Viewed" items={recentlyViewed} actions={{ toggleWishlist, toggleCompare, viewProduct, wishlist, compareList }} />
                )}
              </>
            )}

            <section className="catalog-section" id="deals">
              <div className="section-header">
                <h2>{searchQuery ? "Search Results" : "All Products"}</h2>
              </div>

              <div className="advanced-filters">
                <div className="filter-group">
                  <label>Category:</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    <option value="Laptop">Laptops</option>
                    <option value="Smartphone">Smartphones</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Brand:</label>
                  <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Price Range:</label>
                  <div className="price-inputs">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    <span>-</span>
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Min Rating:</label>
                  <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                    <option value="0">Any</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Sort By:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="loading">Loading AI deals...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  toggleWishlist={toggleWishlist}
                  toggleCompare={toggleCompare}
                  viewProduct={viewProduct}
                  wishlist={wishlist}
                  compareList={compareList}
                />
              )}
            </section>
          </>
        ) : currentView === "wishlist" ? (
          <section className="catalog-section" style={{ marginTop: '80px' }}>
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? <p className="loading">No items in wishlist.</p> :
              <ProductGrid products={wishlist} toggleWishlist={toggleWishlist} toggleCompare={toggleCompare} viewProduct={viewProduct} wishlist={wishlist} compareList={compareList} />
            }
          </section>
        ) : currentView === "compare" ? (
          <section className="catalog-section" style={{ marginTop: '80px' }}>
            <h2>Compare Products</h2>
            {compareList.length === 0 ? <p className="loading">Select products to compare.</p> :
              <ProductGrid products={compareList} toggleWishlist={toggleWishlist} toggleCompare={toggleCompare} viewProduct={viewProduct} wishlist={wishlist} compareList={compareList} />
            }
            {compareList.length > 0 && (
              <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => setShowCompare(true)}>View Detailed Comparison</button>
            )}
          </section>
        ) : (
          <section className="catalog-section" style={{ marginTop: '80px' }}>
            <h2>Profile Area</h2>
            <p className="loading">Account functionality coming soon.</p>
          </section>
        )}
      </main>
      <footer>
        <p>&copy; 2026 Neuroconfig. All rights reserved.</p>
      </footer>
      <Chatbot />

      {showCompare && <CompareModal products={compareList} onClose={() => setShowCompare(false)} />}

      {compareList.length > 0 && !showCompare && currentView !== "compare" && (
        <div className="compare-floating-bar">
          <span>{compareList.length} Selected for Compare</span>
          <button className="btn btn-primary" onClick={() => setShowCompare(true)}>Compare Now</button>
        </div>
      )}

      <MobileNav currentView={currentView} setCurrentView={setCurrentView} wishlistCount={wishlist.length} compareCount={compareList.length} />
    </div>
  );
}

export default App;
