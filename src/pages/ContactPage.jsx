import React, { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    // TODO: Wire to form backend — e.g. Formspree:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    setSubmitted(true);
  }

  return (
    <>
      <main>

        <header className="financial-solutions-hero">
          <div className="container">
            <AnimatedElement animation="fadeInUp">
              <div className="financial-solutions-hero-content">
                <h1>Contact Us</h1>
                <p className="hero-subtitle">
                  Inquire directly to schedule a discussion.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </header>

        <section className="contact" id="contact">
          <div className="container contact-container">
            <div className="contact-content">

              <AnimatedElement animation="fadeInLeftSmall" duration={0.9}>
                <div className="contact-left">
                  <h3 className="section-title-left">Get in Touch</h3>
                  <address>
                    <p><strong>TransWestern Capital Advisors, LLC</strong></p>
                    <p>An SEC-registered investment advisor</p>
                    <p><i className="fas fa-map-marker-alt icon-left"></i>Newport, Rhode Island</p>
                    <p>
                      <i className="fas fa-phone icon-left"></i>
                      <a href="tel:+18009970718">(800) 997-0718</a>
                    </p>
                    <p>
                      <i className="fas fa-envelope icon-left"></i>
                      <a href="mailto:admin@TransWestCap.com">admin@TransWestCap.com</a>
                    </p>
                  </address>
                </div>
              </AnimatedElement>

              <AnimatedElement animation="fadeInRightSmall" delay={0.2} duration={0.9}>
                <div className="contact-right">
                  {submitted ? (
                    <p className="form-success" style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>
                      Thank you — we'll be in touch shortly.
                    </p>
                  ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>

                      <label htmlFor="cf-name">Name *</label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />

                      <label htmlFor="cf-institution">Institution / Organization</label>
                      <input
                        id="cf-institution"
                        name="institution"
                        type="text"
                        value={formData.institution}
                        onChange={handleChange}
                      />

                      <label htmlFor="cf-email">Email *</label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />

                      <label htmlFor="cf-phone">Phone</label>
                      <input
                        id="cf-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                      <label htmlFor="cf-message">How can we help? *</label>
                      <textarea
                        id="cf-message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />

                      <button type="submit" className="btn-primary">
                        Send Message <i className="fas fa-paper-plane"></i>
                      </button>

                    </form>
                  )}
                </div>
              </AnimatedElement>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
