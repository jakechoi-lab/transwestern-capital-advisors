import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import Footer from '../components/Footer';

export default function ResearchPage() {
  return (
    <>
      <main>
        <header className="financial-solutions-hero">
          <div className="container">
            <AnimatedElement animation="fadeInUp">
              <div className="financial-solutions-hero-content">
                <h1>Research</h1>
                <p className="hero-subtitle">
                  Insights and market perspectives for depository financial institutions.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </header>

        <section className="service-detail-section">
          <div className="container">
            <div className="alm-features-grid">
              <AnimatedElement animation="fadeInUpSmall" delay={0.1}>
                <div className="service-subsection card-style">
                  <h4 className="subsection-title">
                    <i className="fas fa-chart-line icon-left"></i>Rate Environment Outlook
                  </h4>
                  <p>
                    Analysis of current yield curve dynamics, volatility trends, and implications
                    for duration and reinvestment strategy over the next planning horizon.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement animation="fadeInUpSmall" delay={0.2}>
                <div className="service-subsection card-style">
                  <h4 className="subsection-title">
                    <i className="fas fa-landmark icon-left"></i>Liquidity and Funding Themes
                  </h4>
                  <p>
                    Commentary on deposit behavior, wholesale funding considerations, and
                    practical balance sheet positioning under stressed and non-stressed scenarios.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement animation="fadeInUpSmall" delay={0.3}>
                <div className="service-subsection card-style">
                  <h4 className="subsection-title">
                    <i className="fas fa-file-signature icon-left"></i>Regulatory Watch
                  </h4>
                  <p>
                    A concise review of policy, accounting, and examiner-focus developments that
                    may affect investment strategy, reporting practices, and governance priorities.
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
