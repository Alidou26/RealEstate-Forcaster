import React, { useState } from 'react';
import '../styles/contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">Our team is ready to help you with your real estate forecasting needs</p>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-container">
          <h2 className="section-title">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info-container">
          <h2 className="section-title contact-info-title">Contact Information</h2>
          
          <div className="contact-info-card">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Our Office</h3>
                <p>123 Forecasting Avenue<br />Paris, France 75000</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>support@realestateforecast.com<br />sales@realestateforecast.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h3>Call Us</h3>
                <p>+33 1 23 45 67 89<br />Mon-Fri, 9am-6pm CET</p>
              </div>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link">𝕏</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;