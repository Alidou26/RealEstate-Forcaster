import React from 'react';
import '../styles/premium.css'

const Premium = () => {
  return (
    <div className="premium-container">
      <h1 className="premium-title">Choose Your Plan</h1>
      <p className="premium-subtitle">Unlock advanced real estate forecasting tailored to your needs</p>

      <div className="plans-grid">
        {/* Free Plan */}
        <div className="plan-card free-plan">
          <div className="plan-header">
            <h2 className="plan-name">Starter</h2>
            <div className="plan-price">Free</div>
            <p className="plan-description">Basic forecasting for casual users</p>
          </div>
          <ul className="plan-features">
            <li>3 predictions per month</li>
            <li>Current market data only</li>
            <li>Standard accuracy</li>
            <li>Email support</li>
          </ul>
          <button className="plan-button free-button">Current Plan</button>
        </div>

        {/* Individual Plan */}
        <div className="plan-card individual-plan highlighted">
          <div className="plan-badge">Most Popular</div>
          <div className="plan-header">
            <h2 className="plan-name">Professional</h2>
            <div className="plan-price">€29<span>/month</span></div>
            <p className="plan-description">For serious investors & agents</p>
          </div>
          <ul className="plan-features">
            <li>50 predictions per month</li>
            <li>1-year future projections</li>
            <li>High accuracy models</li>
            <li>Priority email support</li>
            <li>Neighborhood analytics</li>
          </ul>
          <button className="plan-button primary-button">Upgrade Now</button>
        </div>

        {/* Enterprise Plan */}
        <div className="plan-card enterprise-plan">
          <div className="plan-header">
            <h2 className="plan-name">Enterprise</h2>
            <div className="plan-price">Custom</div>
            <p className="plan-description">For institutions & developers</p>
          </div>
          <ul className="plan-features">
            <li>Unlimited predictions</li>
            <li>10-year forecasting</li>
            <li>Maximum accuracy models</li>
            <li>24/7 dedicated support</li>
            <li>API access</li>
            <li>Custom data integration</li>
          </ul>
          <button className="plan-button enterprise-button">Contact Sales</button>
        </div>
      </div>

      <div className="enterprise-cta">
        <h3>Need something custom?</h3>
        <p>Our team can build tailored forecasting solutions for your specific requirements.</p>
        <button className="cta-button">Request Consultation</button>
      </div>
    </div>
  );
};

export default Premium;