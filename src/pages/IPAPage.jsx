import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from '../components/AnimatedElement';
import StaggeredAnimation from '../components/StaggeredAnimation';
import Footer from '../components/Footer';

export default function IPAPage() {
  return (
    <>
      <main>

        <section className="service-detail-section ancillary-services-page">
          <div className="service-detail-block">
            <div className="container">
              <AnimatedElement animation="fadeInUpSmall">
                <div className="service-content-full">

                  <div className="service-icon-header">
                    <div className="service-icon gradient-icon">
                      <i className="fas fa-crown"></i>
                    </div>
                    <h2>Advisory Built Around Your Program</h2>
                  </div>

                  <p className="service-lead-text">
                    TransWestern Capital Advisors offers a flexible advisory relationship designed
                    to meet your institution wherever it is in the investment management spectrum.
                    Whether you need a one-time independent portfolio review or a fully integrated
                    Outsourced Investment Officer, we bring decades of fixed income and balance
                    sheet management experience directly to your program.
                  </p>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      <i className="fas fa-search icon-left"></i>Portfolio Review
                    </h4>
                    <p>
                      An independent, objective assessment of your institution's current investment
                      portfolio. We evaluate credit quality, duration positioning, sector
                      concentration, yield, and alignment with your investment policy — and deliver
                      a clear, actionable report suitable for ALCO and board review.
                    </p>
                  </div>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      <i className="fas fa-chalkboard-teacher icon-left"></i>Ongoing Advisory
                    </h4>
                    <p>
                      A standing advisory relationship providing regular portfolio analysis, market
                      commentary, trade recommendations, and ALCO meeting participation. Your team
                      retains execution authority while gaining access to institutional-grade
                      research and perspective.
                    </p>
                  </div>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      <i className="fas fa-crown icon-left"></i>Outsourced Investment Officer (OIO)
                    </h4>
                    <p>
                      Full end-to-end investment management for institutions that want the benefit
                      of a dedicated investment officer without the in-house cost. Covers policy
                      oversight, research, portfolio construction, trade execution, documentation,
                      and reporting — coordinated by a dedicated TransWestern relationship manager.
                    </p>
                  </div>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      <i className="fas fa-check-double icon-left"></i>Across All Tiers
                    </h4>
                    <ul className="styled-list check-list-alt">
                      <li>Institutional fixed income research and market intelligence</li>
                      <li>Portfolio analytics calibrated to your regulatory and earnings constraints</li>
                      <li>Comprehensive reporting for ALCO, board, and examiner review</li>
                      <li>Integration with existing ALM, accounting, and custody platforms</li>
                    </ul>
                  </div>

                  <p className="service-contact-cta">
                    <Link to="/contact">
                      Request a portfolio review or schedule a briefing <i className="fas fa-arrow-right"></i>
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
