import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <>
      <main>

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
                  <p>
                    Please contact us directly using the phone number or email listed.
                  </p>
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
