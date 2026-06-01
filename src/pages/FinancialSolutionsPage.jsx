import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { images } from '../assets/images.js';
import Footer from '../components/Footer';
import AnimatedElement from '../components/AnimatedElement';

// Note: Ensure you have an 'images.js' file that exports an empty object 
// if you are not using the BRIDGE logo, or remove this import.
// For example: export const images = {};
// To prevent a runtime error, I will comment it out for now.
// import { images } from '../assets/images.js'; 

const FinancialSolutionsPage = () => {
  const [activeTab, setActiveTab] = useState('cecl-modeling'); // Default to the first tab
  const location = useLocation();
  const navigate = useNavigate();
  const servicesWheelRef = useRef(null);
  const wheelRef = useRef(null);
  const wheelRotationRef = useRef(null);
  const hubRef = useRef(null);
  const [servicesWheelInitialAnimationCompleted, setServicesWheelInitialAnimationCompleted] = useState(false);
  
  // Services Wheel Implementation
  const servicesData = [
    { name: 'Liquidity Testing', icon: 'fa-solid fa-droplet', hlink: '/financial-solutions#liquidity-testing' },
    { name: 'ALM Modeling', icon: 'fa-solid fa-scale-balanced', hlink: '/financial-solutions#alm-modeling' },
    { name: 'CECL Modeling', icon: 'fa-solid fa-chart-column', hlink: '/financial-solutions#cecl-modeling' },
    { name: 'Portfolio Accounting', icon: 'fa-solid fa-chart-line', hlink: '/financial-solutions#portfolio-accounting' },
    { name: 'M&A Advisory', icon: 'fa-solid fa-handshake', hlink: '/financial-solutions#ma-advisory' },
    { name: 'Strategic Planning', icon: 'fa-solid fa-bullseye', hlink: '/financial-solutions#strategic-planning' }
  ];

  const createServiceElements = useCallback(() => {
    if (!wheelRotationRef.current) return;
    
    const existingSpokes = wheelRotationRef.current.querySelectorAll('.spoke');
    existingSpokes.forEach(spoke => spoke.remove());
    
    servicesData.forEach((service, i) => {
      const angle = i * 360 / servicesData.length;
      const spoke = document.createElement('div');
      spoke.className = 'spoke';
      spoke.style.transform = `translate(0, -50%) rotate(${angle}deg)`;
      
      const spokeLine = document.createElement('div');
      spokeLine.className = 'spoke-line';
      spoke.appendChild(spokeLine);
      
      const bubbleLink = document.createElement('a');
      bubbleLink.href = service.hlink;
      bubbleLink.className = 'bubble-link-wrapper';
      bubbleLink.style.setProperty('--angle', `${angle}deg`);
      
      // Add click handler for React Router navigation
      bubbleLink.addEventListener('click', (e) => {
        e.preventDefault();
        const [path, hash] = service.hlink.split('#');
        navigate(path + (hash ? '#' + hash : ''));
      });
      
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.innerHTML = `
        <span class="bubble-icon"><i class="${service.icon}"></i></span>
        <span class="bubble-title">${service.name}</span>
      `;
      
      if (window.innerWidth <= 767 && servicesWheelInitialAnimationCompleted) {
        spokeLine.classList.add('no-initial-reveal-animation');
        bubble.classList.add('no-initial-reveal-animation');
      } else {
        spokeLine.style.animationDelay = `${i * 0.15}s`;
        bubble.style.animationDelay = `${i * 0.15 + 0.2}s`;
      }

      bubbleLink.appendChild(bubble);
      spoke.appendChild(bubbleLink);
      wheelRotationRef.current.appendChild(spoke);
                            
      bubbleLink.addEventListener('mouseenter', () => {
        wheelRotationRef.current.querySelectorAll('.bubble').forEach(b => {
          if (b !== bubble) b.style.opacity = '0.6';
        });
      });
      
      bubbleLink.addEventListener('mouseleave', () => {
        wheelRotationRef.current.querySelectorAll('.bubble').forEach(b => {
           b.style.opacity = '1'; 
        });
      });
      
      bubbleLink.setAttribute('tabindex', '0');
      bubbleLink.setAttribute('role', 'link'); 
      bubbleLink.setAttribute('aria-label', service.name);
    });
  }, [servicesData, servicesWheelInitialAnimationCompleted, navigate]);

  useEffect(() => {
    const servicesWheelArea = servicesWheelRef.current;
    const wheel = wheelRef.current;
    const wheelRotation = wheelRotationRef.current;
    const hub = hubRef.current;
    
    if (!wheel || !wheelRotation || !hub || !servicesWheelArea) return;
    
    // Intersection Observer for wheel animation
    const wheelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !servicesWheelArea.classList.contains('animate-wheel')) {
          servicesWheelArea.classList.add('animate-wheel');
          if (window.innerWidth <= 767) { 
            setServicesWheelInitialAnimationCompleted(true);
          }
          if (window.innerWidth > 767 || (window.innerWidth <= 767 && servicesWheelInitialAnimationCompleted)) {
             wheelObserver.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });

    wheelObserver.observe(servicesWheelArea);

    // Scroll-based wheel rotation
    let currentWheelRotation = 0;
    let targetWheelRotation = 0;
    const wheelRotationMultiplier = 0.8;
    const wheelDamping = 0.1;

    const updateWheelRotationAnimation = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const section = document.getElementById('services-hub');
      if (!section) {
         requestAnimationFrame(updateWheelRotationAnimation);
         return;
      }

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollVisibleStart = sectionTop - viewportHeight;
      const scrollVisibleEnd = sectionTop + sectionHeight;
      const progress = Math.max(0, Math.min(1, (scrollPosition - scrollVisibleStart) / (scrollVisibleEnd - scrollVisibleStart)));
      const maxTotalRotation = 540;
      targetWheelRotation = progress * maxTotalRotation * wheelRotationMultiplier;
      currentWheelRotation += (targetWheelRotation - currentWheelRotation) * wheelDamping;
      document.documentElement.style.setProperty('--sw-wheel-rotation', `${currentWheelRotation}deg`);
      requestAnimationFrame(updateWheelRotationAnimation);
    };

    // Mouse parallax effect
    let mouseX = 0, mouseY = 0, wheelParallaxX = 0, wheelParallaxY = 0;
    const wheelParallaxScale = 10;
    const wheelParallaxDamping = 0.08;

    function handlePointerMove(e) {
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      
      const rect = servicesWheelArea.getBoundingClientRect();
      const wheelAreaCenterX = rect.left + rect.width / 2;
      const wheelAreaCenterY = rect.top + rect.height / 2;

      const relativeMouseX = (clientX - wheelAreaCenterX) / (rect.width / 2);
      const relativeMouseY = (clientY - wheelAreaCenterY) / (rect.height / 2);

      mouseX = relativeMouseX;
      mouseY = relativeMouseY;
    }
    
    servicesWheelArea.addEventListener('mousemove', handlePointerMove);
    servicesWheelArea.addEventListener('touchmove', handlePointerMove, { passive: true });

    function animateBackgroundParallax() {
      const isMobile = window.innerWidth <= 767;
      const currentParallaxScale = isMobile ? wheelParallaxScale * 0.5 : wheelParallaxScale;
      const currentParallaxDamping = isMobile ? wheelParallaxDamping * 1.2 : wheelParallaxDamping;

      wheelParallaxX += (mouseX * currentParallaxScale - wheelParallaxX) * currentParallaxDamping;
      wheelParallaxY += (mouseY * currentParallaxScale - wheelParallaxY) * currentParallaxDamping;
      
      const servicesRing = wheelRotation.querySelector('.services-ring');
      if (servicesRing) {
        servicesRing.style.transform = `translate(calc(-50% + ${wheelParallaxX}px), calc(-50% + ${wheelParallaxY}px))`;
      }
      requestAnimationFrame(animateBackgroundParallax);
    }

    const throttle = (func, delay) => {
      let timeoutId;
      let lastExecTime = 0;
      return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
          func.apply(this, args);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(this, args);
            lastExecTime = Date.now();
          }, delay - (currentTime - lastExecTime));
        }
      };
    };

    // Initialize and event listeners
    const initTimeout = setTimeout(() => {
      createServiceElements();
    }, 300);

    const handleResize = throttle(() => {
      requestAnimationFrame(() => createServiceElements());
    }, 150);
    
    const handleOrientationChange = () => {
      setTimeout(() => createServiceElements(), 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    updateWheelRotationAnimation();
    animateBackgroundParallax();

    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      servicesWheelArea.removeEventListener('mousemove', handlePointerMove);
      servicesWheelArea.removeEventListener('touchmove', handlePointerMove);
      wheelObserver.unobserve(servicesWheelArea);
    };
  }, [createServiceElements, servicesWheelInitialAnimationCompleted]);
  
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = document.querySelector('#main-nav')?.offsetHeight || 0;
      const navTop = parseInt(window.getComputedStyle(document.querySelector('.nav-container')).top) || 0;
      const offset = navHeight + navTop + 20;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveTab(sectionId);
    }
  };

  return (
    <>
      {/* Services Hub Section */}
      <section id="services-hub" className="services-hub">
        <div className="container">
          <div className="services-hub-header">
            <AnimatedElement animation="fadeInUp">
              <h2>Related Financial Solutions</h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeInUp" delay={0.1}>
              <p className="section-subtitle">
                Our portfolio management suite is designed to work with your existing reporting and risk management tools. BRIDGE services utilize and feed other systems that our clients are currently dependent upon and familiar with. For those that have need of specific tools, however, our Financial Solutions affiliate stands ready to fill any gaps.
              </p>
            </AnimatedElement>
          </div>
          
          <AnimatedElement animation="scaleIn" delay={0.2} duration={1.2}>
            <div id="services-wheel-interactive-area" ref={servicesWheelRef}>
              <div id="wheel" ref={wheelRef}>
                <div className="wheel-rotation" ref={wheelRotationRef}>
                  <div className="services-ring"></div>
                </div>
                <div className="hub" ref={hubRef}>
                  <img 
                    src={images.logoBankTransparentNoOutline}
                    alt="Financial Solutions Hub Icon - Bank Building"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.4}>
            <div className="services-hub-cta">
              <a href="/financial-solutions" className="btn-primary">Explore All Financial Solutions <i className="fas fa-arrow-right"></i></a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <header className="financial-solutions-hero">
        <div className="container">
          <AnimatedElement animation="fadeInUp">
            <div className="financial-solutions-hero-content">
              <h1>Related Financial Solutions</h1>
              <AnimatedElement animation="fadeInUp" delay={0.3}>
                <p>
                  Architecting your institution's resilience and growth through proven and trusted advisory services that address the complex challenges and strategic imperatives of modern financial institutions.
                </p>
              </AnimatedElement>
              {/* "Explore Our Solutions" Button has been removed as per the latest document */}
            </div>
          </AnimatedElement>
        </div>
      </header>
      
      <section id="solutions-overview" className="solutions-overview-section">
        <div className="container">
          {/* "Comprehensive Financial Solutions" h2 has been removed as per the latest document */}
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <p className="section-subtitle section-subtitle-center">
              In today's complex financial landscape, institutions require more than isolated advice. Our integrated solutions provide a holistic view of risk, opportunity, and strategic direction.
            </p>
            <p className="section-subtitle section-subtitle-center">
              Whether there is a gap in an analysis suite that needs to be filled, or an institution simply wants to consider partnering with a firm that can deliver an externally managed 360 degree investment program, our firm has supported institutions in any number of combinations of the following services over the decades.
            </p>
          </AnimatedElement>

          {/* Outsourced CIO Section */}
          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <div className="ocio-feature-section">
              <div className="ocio-header">
                <h2 className="ocio-title">Outsourced Chief Investment Officer</h2>
              </div>
              <p className="ocio-description large-copy-target">
                Outsourced Chief Investment Officer (OCIO) is our comprehensive platform for delivering a robust liquidity and investment management program. Liquidity testing, ALM, deposit analysis, research, portfolio management, trading, documentation, settlement, custody, bond accounting, and reporting, are all components of the OCIO program.
              </p>
              <p className="ocio-description large-copy-target">
                For many clients, they have come to trust long-standing providers of key analysis or advice, e.g. concerning ALM and interest rate risk management—an area so essential to the investment process that our OCIO prefers to work with, rather than replace, incumbent providers. Our OCIO can take that trusted perspective and execute upon it with best-in-class precision. Regardless, our clients will experience a sea change in efficiency, risk management, liquidity management, earnings, and control over their balance sheet when the resources of our OCIO are brought to bear on their behalf.
              </p>
              <Link to="/#contact" className="btn-primary ocio-btn">
                Click here to schedule a briefing on OCIO <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
             <p className="section-subtitle section-subtitle-center" style={{marginTop: 'var(--spacing-xl)'}}>
              Whether supporting the OCIO, or in aid of a particular need or opportunity faced by our clients, we can offer solutions that are all several decades in evolution and enhancement, and specifically calibrated to support depository institution financial management.
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <div className="solutions-tabs">
              <button 
                className={`solutions-tab-btn ${activeTab === 'cecl-modeling' ? 'active' : ''}`}
                onClick={() => scrollToSection('cecl-modeling')}
                data-target="cecl-modeling"
              >
                CECL Modeling
              </button>
              <button 
                className={`solutions-tab-btn ${activeTab === 'alm-modeling' ? 'active' : ''}`}
                onClick={() => scrollToSection('alm-modeling')}
                data-target="alm-modeling"
              >
                Asset/Liability Modeling
              </button>
              <button 
                className={`solutions-tab-btn ${activeTab === 'portfolio-accounting' ? 'active' : ''}`}
                onClick={() => scrollToSection('portfolio-accounting')}
                data-target="portfolio-accounting"
              >
                Fixed Income Accounting
              </button>
              <button 
                className={`solutions-tab-btn ${activeTab === 'deposit-analysis' ? 'active' : ''}`}
                onClick={() => scrollToSection('deposit-analysis')}
                data-target="deposit-analysis"
              >
                Deposit Analysis
              </button>
              <button 
                className={`solutions-tab-btn ${activeTab === 'liquidity-testing' ? 'active' : ''}`}
                onClick={() => scrollToSection('liquidity-testing')}
                data-target="liquidity-testing"
              >
                Liquidity Testing & Reporting
              </button>
              <button 
                className={`solutions-tab-btn ${activeTab === 'ma-advisory' ? 'active' : ''}`}
                onClick={() => scrollToSection('ma-advisory')}
                data-target="ma-advisory"
              >
                Mergers & Acquisitions
              </button>
              <button 
                className={`solutions-tab-btn ${activeTab === 'strategic-planning' ? 'active' : ''}`}
                onClick={() => scrollToSection('strategic-planning')}
                data-target="strategic-planning"
              >
                Strategic Planning
              </button>
            </div>
          </AnimatedElement>
        </div>
      </section>
      
      <section className="service-detail-section">
        
        {/* CECL Modeling */}
        <div id="cecl-modeling" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-calculator"></i>
                  </div>
                  <h3>C.E.C.L.</h3>
                </div>
                
                <p className="service-lead-text">
                  Current Expected Credit Loss, or “CECL,” has shifted how financial institutions account for their expected credit losses.
                </p>
                <p>
                  Developed by the Financial Accounting Standards Board (FASB) in 2016, CECL replaces the former standards for accounting for credit losses (FAS-5 and FAS-114). CECL requirements apply to any financial institution that issues credit, including banks, credit unions, savings institutions, and holding companies filing under the GAAP accounting standards. More specifically, the rules affect any entity with net investment and financial assets in leases that have not been accounted for at fair value through net income.
                </p>
                <p>
                  TransWestern’s trusted partner has developed an innovative CECL software solution, used for several years in institutions nationwide, streamlining compliance across the board. The model eliminates the guesswork associated with CECL requirements, saving your financial institution time, effort, and expense.
                </p>
                
                <div className="service-subsection card-style">
                  <h4 className="subsection-title"><i className="fas fa-chart-pie icon-left"></i>Producing your Quarterly CECL Report</h4>
                  <p>Our partner provides extensive support in CECL implementation, generating quarterly CECL reports by:</p>
                  <ul className="styled-list check-list-alt">
                    <li>Gathering required financial data from all call reports</li>
                    <li>Completing required calculations utilizing the open pool method</li>
                    <li>Performing required peer calculations</li>
                    <li>Collecting and analyzing qualitative factors using our symmetrical matrix</li>
                    <li>Assisting in the development and execution of required adjustments to accurately reflect your situation</li>
                    <li>Ensuring you are prepared for the exam</li>
                  </ul>
                </div>
                
                <div className="service-subsection card-style">
                  <h4 className="subsection-title"><i className="fas fa-hands-helping icon-left"></i>Minimize Your Burden</h4>
                  <p>Your organization will be relieved of the burden of CECL compliance, participating in the process by:</p>
                  <ul className="styled-list check-list-alt">
                    <li>Providing basic information in a quick, point-and-click Q-factor questionnaire</li>
                    <li>Meeting with the analyst to review and refine inputs and results as needed</li>
                  </ul>
                </div>
                
                <div className="service-subsection card-style">
                  <h4 className="subsection-title"><i className="fas fa-shield-alt icon-left"></i>A Solid CECL Solution</h4>
                  <p>We chose this program as it is a do-it-all software solution that takes the stress out of CECL implementation.</p>
                  
                  <h5 className="list-intro-title">Benefits Include:</h5>
                  <ul className="styled-list diamond-list">
                    <li>A complete solution and fully-validated model</li>
                    <li>No complicated calculations</li>
                    <li>Intuitive software</li>
                    <li>Backed by extensive regulatory experience</li>
                    <li>Scalable solutions with optional upgrades are available</li>
                  </ul>
                </div>
                
                <p className="service-contact-cta">
                  <Link to="/#contact">Schedule a briefing on our CECL solutions <i className="fas fa-arrow-right"></i></Link>
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
        
        {/* ALM Modeling */}
        <div id="alm-modeling" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-scale-balanced"></i>
                  </div>
                  <h3>Asset/Liability Modeling</h3>
                </div>
                
                <p className="service-lead-text">
                  Our Trusted Partners offer ALM models that are proven, well-validated, interest rate risk measurement and reporting solutions that allow financial institutions to meet regulatory requirements and support decision-making using instrument level data.
                </p>
                 <p>
                  The data capture process is designed for efficiency and accuracy. With a robust data conversion and validation process, most modeling data can be imported and then validated in a matter of minutes. TransWestern is able to refer solutions for a full range of institutional size and complexity, if and as needed.
                </p>

                {/* UPDATED: This container now uses a new class for a better layout */}
                <div className="alm-features-grid">
                    <div className="service-subsection card-style">
                        <h4 className="subsection-title-small"><i className="fas fa-database"></i>Instrument Level Detail</h4>
                        <p>Enhanced risk profiling and accuracy using detailed data on loans, deposits, and securities, with institution-specific assumptions.</p>
                    </div>
                    <div className="service-subsection card-style">
                        <h4 className="subsection-title-small"><i className="fas fa-file-alt"></i>Comprehensive Reports</h4>
                        <p>Insightful reports for quick answers, including back-testing, variance, and graphical summaries to detailed views.</p>
                    </div>
                    <div className="service-subsection card-style">
                        <h4 className="subsection-title-small"><i className="fas fa-calculator"></i>Accurate Calculations</h4>
                        <p>All major IRR calculations (EaR, EVE, Liquidity) consistent with regulatory guidance.</p>
                    </div>
                    <div className="service-subsection card-style">
                        <h4 className="subsection-title-small"><i className="fas fa-chart-line"></i>Executive Summaries</h4>
                        <p>Digestible summaries with economic/peer data, explained quarterly to ALCO or board.</p>
                    </div>
                    <div className="service-subsection card-style">
                        <h4 className="subsection-title-small"><i className="fas fa-money-bill-wave"></i>Deposit Assumptions</h4>
                        <p>FDIC-preferred methods used to calculate your institution-specific deposit decay and beta assumptions.</p>
                    </div>
                </div>
                
                <p className="service-contact-cta">
                  <Link to="/#contact">Discuss your ALM needs and schedule a briefing <i className="fas fa-arrow-right"></i></Link>
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
        
        {/* Portfolio Accounting */}
        <div id="portfolio-accounting" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <h3>FIXED INCOME ACCOUNTING (“FIA”) – FASB</h3>
                </div>
                
                <h4 className="service-main-subtitle">Know Your Portfolio with Greater Accuracy and Ease</h4>
                <p className="service-lead-text">
                  Our trusted partner’s FIA model provides you with an easy and effective way to monitor your institution’s bond portfolio.
                </p>
                
                <div className="service-subsection card-style">
                  <h4 className="subsection-title"><i className="fas fa-cogs icon-left"></i>How It Works</h4>
                  <p>
                    Fixed Income Accounting is entirely a web-based system that is flexible, straightforward, and easy to use. The knowledgeable staff will work with you to determine your data and reporting needs and provide solutions on either a standardized or customized level. For CFOs, ALCOs, and other finance professionals looking to get reliable accounting information, they have the solution. The monthly reports use the most current bond valuation and cash flow information available.
                  </p>
                  <p>
                    Fixed Income Accounting calculates accretion and amortization along with interest accruals. Par and book values are also captured with premiums and discounts to allow activity to be processed on a daily basis. CPR/PSA rates can be customized at the holdings level or defaulted to the independent source for amortizing securities.
                  </p>
                </div>
                
                <div className="grid-layout two-columns">
                    <div className="service-subsection card-style">
                      <h5 className="list-intro-title"><i className="fas fa-star icon-left gold-icon"></i>Key Advantages:</h5>
                      <ul className="styled-list arrow-list">
                        <li>No software to install or maintain</li>
                        <li>No large upfront capital expense</li>
                        <li>Integrates with any ALM Model</li>
                        <li>Independent valuations from trusted and reliable sources</li>
                        <li>Robust accounting and management reports</li>
                        <li>Very limited data entry means a limited time commitment</li>
                      </ul>
                    </div>
                
                    <div className="service-subsection card-style">
                      <h5 className="list-intro-title"><i className="fas fa-plus-circle icon-left green-icon"></i>More Benefits Include:</h5>
                      <ul className="styled-list arrow-list">
                        <li>Unlimited sorting & exporting capabilities</li>
                        <li>Provides pricing and cash flow projections</li>
                        <li>Provides call report information (RCB & 5300)</li>
                        <li>Reports track Safekeeping and Pledging across multiple financial institutions</li>
                        <li>Reports can be exported directly into your General Ledger or spreadsheets</li>
                        <li>Users (or TransWestern can) enter trade information online</li>
                        <li>Data and reports are archived for retrieval if needed at a later date</li>
                      </ul>
                    </div>
                </div>
                
                <p className="service-contact-cta">
                 <Link to="/#contact">Schedule a briefing on the FIA solution <i className="fas fa-arrow-right"></i></Link>
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Deposit Analysis */}
        <div id="deposit-analysis" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-coins"></i>
                  </div>
                  <h3>Deposit Analysis</h3>
                </div>
                <p className="service-lead-text">
                  Measuring the interest rate sensitivity of a depository institution’s deposit base is not just a prudent risk management practice—it is a strategic imperative that directly supports profitability, stability, and long-term competitiveness.
                </p>
                <p className="service-lead-text">Deeper understanding of core deposit behavior can yield several tangible benefits, including:</p>
                
                {/* UPDATED: This className now uses the new flex layout */}
                <ul className="styled-list check-list benefits-flex-layout">
                    <li><span>Protection of Net Interest Margin (NIM)</span></li>
                    <li><span>Informing Strategic Pricing and Product Design</span></li>
                    <li><span>Enhancing Asset-Liability Management (ALM)</span></li>
                    <li><span>Support for Regulatory and Investor Confidence</span></li>
                    <li><span>Identification of Behavioral Trends and Early Warning Signals</span></li>
                </ul>

                <p className="highlight-text">
                  In a dynamic rate environment, complacency is costly. Measuring the interest rate sensitivity of deposits is not merely a back-office function—it is a forward-looking practice that empowers leadership to make informed, agile, and strategic decisions.
                </p>
                <div className="service-subsection card-style">
                  <h4 className="subsection-title"><i className="fas fa-drafting-compass icon-left"></i>Deposit Decay and Beta Study</h4>
                  <p>The basic deliverables for a Deposit Decay and Beta study are:</p>
                  <ul className="styled-list dot-list">
                    <li>Weighted Average Life and Annual Decay profile for a mutually agreed upon set of deposit account groupings (should be consistent with ALM account breakdown). These results are produced for multiple review periods and also on a Surge Balance Adjusted basis.</li>
                    <li>Rising and falling rate Betas for each product code in the study.</li>
                    <li>A report documenting the study methodology, process and results. The documentation report will typically run about 10+/- pages of narrative with many pages of supporting data and charts.</li>
                  </ul>
                  <p className="timeline-note"><i className="fas fa-hourglass-half"></i> Study completed within 90 days from data receipt.</p>
                  <p>The study will provide Decay output for multiple account types, consistent with ALM deposit product breakdowns. Customizable to determine the optimal product segmentation, providing sufficient detail while maintaining adequate data sample size. Beta results are provided for each product code or description with consistent, complete data.</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
        
        {/* Liquidity Testing */}
        <div id="liquidity-testing" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-water"></i>
                  </div>
                  <h3>Liquidity Testing & Reporting</h3>
                </div>
                
                <p className="service-lead-text">
                  Depository Financial Institutions should perform liquidity tests as a fundamental part of prudent financial management and regulatory compliance. These tests help institutions ensure they can meet their short-term obligations and continue to serve their customers under both normal and stressed conditions.
                </p>
                <p className="service-lead-text">Several compelling objectives make liquidity testing essential:</p>
                <ul className="styled-list check-list icon-color-alt benefits-grid">
                    <li><span>Safeguarding Depositor Confidence</span></li>
                    <li><span>Regulatory Expectations and Compliance</span></li>
                    <li><span>Managing Funding Risk</span></li>
                    <li><span>Strategic and Contingency Planning</span></li>
                </ul>
                <p className="highlight-text">
                  Liquidity shortfalls often lead to forced asset sales, which can crystallize unrealized losses and harm earnings—or worse. Proactive testing helps management avoid fire sales, enabling better timing and selection of funding or portfolio adjustments.
                </p>
                <p className="service-contact-cta">
                  <Link to="/#contact">Discuss your institution’s specific liquidity needs <i className="fas fa-arrow-right"></i></Link>
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
        
        {/* M&A Advisory */}
        <div id="ma-advisory" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3>Mergers & Acquisitions</h3>
                </div>
                
                <p className="service-lead-text">
                  TransWestern principals have sourced and executed several transactions for depository institutions over the years. Working directly with institutional leadership on a regular basis has given us opportunities to support the thought process—and, when ready, the transaction process—with seasoned perspective.
                </p>
                 <p>
                  Below are some guiding thoughts to consider if and when opportunities for acquisition or sale are considered. Call us for a confidential and discreet conversation about your opportunities anytime.
                </p>
                
                <div className="service-subsection">
                  <h4 className="subsection-title text-center "><i className="fas fa-project-diagram icon-left"></i>TransWestern Capital – Sale Process</h4>
                  <p className="text-center">TransWestern employs a disciplined approach to community bank and branch sales designed to unlock and maximize value at each step of the process.</p>
                </div>
                
                <div className="ma-process-timeline">
                  <div className="ma-phase-item-v2">
                    <div className="ma-phase-marker"><span>I</span></div>
                    <div className="ma-phase-details">
                      <h5 className="ma-phase-title">Pre-Sale Planning</h5>
                      <ul className="styled-list arrow-list-alt">
                        <li>Discuss goals and objectives of board, shareholders and management</li>
                        <li>Develop understanding of the bank’s business model and competitive position</li>
                        <li>Prepare detailed valuation analysis to assist buyer / investor evaluations</li>
                        <li>Analyze strategic rationale for various buyer / investor groups</li>
                        <li>Identify potential obstacles to sale and deal with them directly and upfront</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ma-phase-item-v2">
                    <div className="ma-phase-marker"><span>II</span></div>
                    <div className="ma-phase-details">
                      <h5 className="ma-phase-title">Preparation for Sale</h5>
                      <ul className="styled-list arrow-list-alt">
                        <li>Create Executive Summary and prepare the Confidential Information Memorandum</li>
                        <li>Finalize list of potential buyers / investors and analysis of buyer-specific synergies</li>
                        <li>Compile data room and begin work on management presentation</li>
                        <li>Field inquiries from interested parties to minimize disruption to the Bank</li>
                        <li>Distribute Confidential Information Memorandum to approved parties</li>
                        <li>Facilitate flow of information to prospective buyers / investors</li>
                        <li>Assist in evaluating letters of interest and qualifying buyers / investors</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ma-phase-item-v2">
                    <div className="ma-phase-marker"><span>III</span></div>
                    <div className="ma-phase-details">
                      <h5 className="ma-phase-title">Buyer Selection & Due Diligence</h5>
                      <ul className="styled-list arrow-list-alt">
                        <li>Arrange visits with management for qualified parties</li>
                        <li>Assist the bank in evaluating bids</li>
                        <li>Evaluate price, structure, and conditions set by buyers / investors</li>
                        <li>Evaluate buyers’ / investors’ financial capability to close transaction</li>
                        <li>Value non-cash consideration</li>
                        <li>Value potential synergies</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ma-phase-item-v2">
                    <div className="ma-phase-marker"><span>IV</span></div>
                    <div className="ma-phase-details">
                      <h5 className="ma-phase-title">Closing the Transaction</h5>
                      <ul className="styled-list arrow-list-alt">
                        <li>Manage due diligence process</li>
                        <li>Assist in negotiation of definitive purchase & sale and other ancillary agreements</li>
                        <li>Assist in structuring and closing the transaction</li>
                        <li>Ensure timely follow-through and settlement of any post-closing obligations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
        
        {/* Strategic Planning */}
        <div id="strategic-planning" className="service-detail-block" data-animation="fadeInUpSmall">
          <div className="container">
            <AnimatedElement animation="fadeInUp" delay={0.2}>
              <div className="service-content-full">
                <div className="service-icon-header">
                  <div className="service-icon gradient-icon">
                    <i className="fas fa-chess-board"></i>
                  </div>
                  <h3>Strategic Planning</h3>
                </div>

                <div className="strategic-planning-grid">
                  <div className="strategic-planning-text">
                    <p className="service-lead-text" style={{textAlign: 'left', maxWidth: '100%'}}>
                      Boards routinely face historical decisions regarding the institutions under their stewardship. Most directors, and even c-suite leadership, have experience that is limited to their region, state, or locality, and stand to benefit from an experienced outside perspective.
                    </p>
                    <p>
                      TransWestern brings decades of balance sheet management, mergers & acquisitions, branch acquisition and divestiture, capital management, and other experience to bear on behalf of institutional directors.
                    </p>
                    <p>
                      We are fortified by backgrounds in law, investment banking, asset management, and years of countless situations that inform our advice. Talk with us about helping your institution through the next material decision today.
                    </p>
                  </div>
                  <div className="strategic-planning-visual">
                    <img 
                      src="https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                      alt="Strategic planning session with professionals at a board room table."
                      className="service-image"
                    />
                  </div>
                </div>

              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      
      {/* The BRIDGE section has been removed as per the latest document */}
      
      <Footer />
    </>
  );
};

export default FinancialSolutionsPage;