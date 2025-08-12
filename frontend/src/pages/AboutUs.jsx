import React from 'react';
import '../styles/aboutus.css'

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">Real Estate Forecasting Revolution</h1>
      
      <section className="mission-section">
        <h2 className="section-title">Our Vision</h2>
        <p className="mission-text">
          We're transforming real estate prediction by combining <span className="highlight">AI-powered analytics</span> with 
          <span className="highlight"> urban development insights</span> to forecast Paris property values up to 2035.
        </p>
      </section>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Future-Aware Predictions</h3>
          <p>We analyze planned infrastructure, zoning changes, and economic trends to predict long-term value shifts.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Data-Powered Accuracy</h3>
          <p>Our models process government datasets, market trends, and urban development plans for precise forecasts.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🌆</div>
          <h3>Dynamic Urban Intelligence</h3>
          <p>Track how new transit lines, schools, and commercial zones will impact neighborhood values.</p>
        </div>
      </div>

      <section className="benefits-section">
        <h2 className="section-title who-benefits-title">Who Benefits?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <h3>Investors</h3>
            <p>Identify high-growth areas before market trends become obvious.</p>
          </div>
          <div className="benefit-item">
            <h3>Urban Planners</h3>
            <p>Simulate how policy changes will affect housing markets.</p>
          </div>
          <div className="benefit-item">
            <h3>Homebuyers</h3>
            <p>Make informed decisions with 10-year valuation forecasts.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="section-title">Ready to Explore?</h2>
        <p>Experience the future of real estate forecasting today.</p>
        <a href="/Forcaster" className="cta-button">Try Our Predictor</a>
      </section>
    </div>
  );
}

export default AboutUs;