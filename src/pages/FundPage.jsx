import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/images.js';
import AnimatedElement from '../components/AnimatedElement';
import StaggeredAnimation from '../components/StaggeredAnimation';
import Footer from '../components/Footer';

export default function FundPage() {
  return (
    <>
      <main>

        <header className="financial-solutions-hero">
          <div className="container">
            <AnimatedElement animation="fadeInUp">
              <div className="financial-solutions-hero-content">
                <h1>Our Mutual Fund Offering</h1>
                <p className="hero-subtitle">
                  A turn-key, SEC-registered 1940 Act Mutual Fund engineered for financial institutions.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </header>

        <section className="service-detail-section">
          <div className="service-detail-block">
            <div className="container">
              <AnimatedElement animation="fadeInUpSmall">
                <div className="service-content-full">

                  <div className="service-icon-header">
                    <div className="service-icon gradient-icon">
                      <i className="fas fa-university"></i>
                    </div>
                    <h2>TWSGX Government Bond Fund</h2>
                  </div>

                  <p className="service-lead-text">
                    The TransWestern Institutional Short Duration Government Bond Fund (TWSGX) is
                    a 1940 Act mutual fund. Institutional-only, it offers a professionally managed
                    portfolio of treasury and agency mortgage securities, T+1 liquidity, daily
                    pricing, and 20% risk-weighting. Ideal for many pledging purposes, the fund
                    has served banks, credit unions, and other institutional investors for over
                    14 years.
                  </p>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      <i className="fas fa-check-circle icon-left"></i>Key Features
                    </h4>
                    <ul className="styled-list check-list-alt">
                      <li>1940 Act mutual fund — SEC-registered</li>
                      <li>Institutional investors only</li>
                      <li>Treasury and agency mortgage securities</li>
                      <li>T+1 liquidity</li>
                      <li>Daily pricing</li>
                      <li>20% risk-weighting</li>
                      <li>14+ year track record</li>
                      <li>Suitable for many pledging purposes</li>
                    </ul>
                  </div>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      <i className="fas fa-star icon-left"></i>5-Star Rated
                    </h4>
                    <p>
                      TWSGX has earned a 5-star rating through consistent, disciplined management
                      of a short-duration government portfolio. Our institutional-only structure
                      means your capital is managed alongside peers with identical objectives —
                      no retail dilution, no competing priorities.
                    </p>
                  </div>

                  <p className="service-contact-cta">
                    <Link to="/contact">
                      Request fund documents or schedule a briefing <i className="fas fa-arrow-right"></i>
                    </Link>
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
