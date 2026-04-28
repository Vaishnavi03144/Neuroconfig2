import React from 'react';

const Hero = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="hero" id="home">
      <h1>Find Smart Deals with AI</h1>
      <p>
        Experience the next generation of seamless product recommendations.
        Neuroconfig uses advanced AI to match you perfectly with standard-defining tech.
      </p>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name, brand, or tag (e.g., gaming)..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => document.getElementById("deals").scrollIntoView({behavior: "smooth"})}>Search</button>
      </div>
      
      <div className="hero-ctas">
        <button className="btn btn-primary" onClick={() => document.getElementById("deals").scrollIntoView({behavior: "smooth"})}>Browse Deals</button>
        <button className="btn btn-secondary">Learn More</button>
      </div>
    </section>
  );
};

export default Hero;
