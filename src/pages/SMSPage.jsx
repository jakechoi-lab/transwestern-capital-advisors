import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedElement from '../components/AnimatedElement';
import StaggeredAnimation from '../components/StaggeredAnimation';
import Footer from '../components/Footer';

export default function SMSPage() {
  return (
    <>
      <main>

        <section className="service-detail-section core-solutions-page">
          <div className="service-detail-block">
            <div className="container">
              <AnimatedElement animation="fadeInUpSmall">
                <div className="service-content-full">

                  <div className="service-icon-header">
                    <h2>Our Core Solutions</h2>
                  </div>

                  <p className="service-lead-text">
                    We deliver tailored fixed income and liquidity solutions designed specifically for depository financial institutions.
                  </p>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      Separately Managed Strategies (SMS)
                    </h4>
                    <p className="large-copy-target">
                      These are custom designed and individually managed strategies managed through securities held directly on-balance sheet-for both pledging and AFS or HTM treatment. Whether our Short Government Strategy (100% agency and Treasury securities), Investment Grade Securitized Strategy (government, non-agency RMBS/CMBS, ABS, and CLO), investment grade corporate bonds, municipal ladders, or a variation that incorporates elements of these, we have track records that plainly demonstrate game-changing performance, backed by best-in-business research.
                    </p>
                  </div>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      Institutional Investment Portfolio Adviser (IIPA)
                    </h4>
                    <p className="large-copy-target">
                      Serving as an outsourced Investment Manager, we can provide a comprehensive suite of services to bring the very best resources to bear on behalf of your institution. Working directly with ALCO, with additional oversight of the board, we seek to deliver the most optimal investment portfolio possible, within the risk parameters, earnings targets, and liquidity needs as dictated. IIPA includes top-down economic perspectives, bottom-up structural security analysis, leading portfolio management processes, board education, world-class trading execution, as well as settlement, accounting, reporting, and ALM integration, all with complete transparency and alignment of interests.
                    </p>
                  </div>

                  <div className="service-subsection card-style">
                    <h4 className="subsection-title">
                      Short Government Mutual Fund
                    </h4>
                    <p className="large-copy-target">
                      Since 2011, our Short Duration Government Bond Fund has served Credit Unions and other financial institutions as a source of stability, liquidity, and predictable rate sensitivity. It's an SEC-Registered 1940 Act fund, comprising 100% of government and government agency securities. The only fund built for depository institutions receiving Morningstar's 5-Star rating. It is held in the AFS classification, receives a 20% risk weighting, and offers next-day liquidity. Importantly, our fund is accepted as collateral for many wholesale funding providers.
                    </p>
                  </div>

                  <p className="service-contact-cta">
                    <Link to="/contact">
                      Schedule a strategy discussion
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
