import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { images } from '../assets/images';
import Footer from '../components/Footer';
import AnimatedElement from '../components/AnimatedElement';

const BridgePlatformPage = () => {
  const particlesRef = useRef(null);
  const animationFrameId = useRef(null); 

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particleCount = 40; 
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      particle.style.position = 'absolute';
      particle.style.background = 'rgba(255, 255, 255, 0.5)'; 
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';

      const x = Math.random() * 100; 
      const y = Math.random() * 100; 
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;

      const size = 1 + Math.random() * 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const opacity = 0.1 + Math.random() * 0.4;
      particle.style.opacity = opacity.toString();

      const duration = 20 + Math.random() * 20;
      particle.style.transition = `opacity 1s ease-in-out`; 

      particles.push({
        element: particle,
        x, y,
        size,
        opacity,
        baseDuration: duration, 
        lastMoved: Date.now() - Math.random() * 5000 
      });

      container.appendChild(particle);
    }

    const moveParticles = () => {
      const now = Date.now();

      particles.forEach(particle => {
        if (now - particle.lastMoved < 5000) {
          return; 
        }

        const targetXPercent = (particle.x + (Math.random() - 0.5) * 20 + 100) % 100;
        const targetYPercent = (particle.y + (Math.random() - 0.5) * 20 + 100) % 100;
        const newOpacity = 0.1 + Math.random() * 0.4;

        particle.element.style.opacity = '0'; 

        setTimeout(() => { 
          particle.x = targetXPercent; 
          particle.y = targetYPercent;
          
          const moveDuration = particle.baseDuration * (0.5 + Math.random() * 0.75); 
          particle.element.style.transition = `opacity 0.5s ease-in-out 0.5s, left ${moveDuration}s linear, top ${moveDuration}s linear`;
          
          particle.element.style.left = `${particle.x}%`;
          particle.element.style.top = `${particle.y}%`;
          particle.element.style.opacity = newOpacity.toString();
          particle.opacity = newOpacity;
          
        }, 1000); 

        particle.lastMoved = now;
      });

      animationFrameId.current = requestAnimationFrame(moveParticles); 
    };

    animationFrameId.current = requestAnimationFrame(moveParticles);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      particles.forEach(p => {
        if (p.element && p.element.parentNode) {
            p.element.parentNode.removeChild(p.element);
        }
      });
    };
  }, []);


  return (
    <div className="bridge-platform-page">

      <header className="bridge-hero">
        <div className="bridge-hero-particles" ref={particlesRef}></div>
        <div className="container">
          <div className="bridge-hero-content">
            <AnimatedElement animation="scaleIn" delay={0.2}>
              <img 
                src={images.logoTransparentBridge} 
                alt="BRIDGE Platform by TransWestern Capital Advisors" 
                className="bridge-hero-logo"
              />
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={0.4}>
              <h2>
                Engineered portfolios built with discipline, data, and a depository focus.
              </h2>
            </AnimatedElement>
            
          </div>
        </div>
      </header>

      <section id="bridge-core-narrative" className="bridge-core-narrative-section">
        <div className="container narrative-container">
            <AnimatedElement animation="fadeInUp" delay={0.2} className="narrative-block">
                
                <p className="narrative-text">
                  BRIDGE is the platform that brings world-class asset management to bear in support of financial institution fixed income investment management. BRIDGE serves select institutions as an outsourced chief investment officer, or OCIO, as the cornerstone of an efficiently executed investment process. For others, BRIDGE offers a highly-specialized single strategy manager to supplement an internally managed investment program. For all clients, BRIDGE provides a robust yet user-friendly model to support liquidity management, employs top-down economic, rates, and sector research, combined with deep product and relative value research, portfolio management, and the trading capabilities of a world-class fixed income asset manager. Most of all, BRIDGE will help take your institution to more efficient use of capital, and closer to optimal monetization of your hard-earned deposit market share.
                </p>
                <p className="narrative-text">
                  BRIDGE delivers resources that would otherwise be practically impossible to maintain in-house, so that clients can gain more operational leverage through other areas of responsibility.
                </p>
                <p className="narrative-text">
                  The BRIDGE between your institution and the global capital markets starts with a deep understanding of your firm’s unique characteristics. Those include risk parameters, investment policies, liquidity needs, and earnings goals, as established with your leadership.
                </p>
                <p className="narrative-highlight">
                  <i className="fas fa-layer-group highlight-icon"></i>
                  <span>Portfolio construction, maintenance, economic research, credit research, trading, settlement, custody, regulatory and managerial documentation, are all basic elements available through BRIDGE.</span>
                </p>
            </AnimatedElement>

            <AnimatedElement animation="fadeInUp" delay={0.3} className="narrative-block engineered-block">
                <h3 className="engineered-deliver-title">
                    Built on top of decades of experience and relationships, BRIDGE has been engineered to deliver:
                </h3>
                <ul className="engineered-features-grid">
                    {[
                        { text: "Stronger risk-adjusted returns", icon: "fas fa-chart-line" },
                        { text: "Comprehendible Reporting for Effective Oversight", icon: "fas fa-file-signature" },
                        { text: "Data Integration", icon: "fas fa-database" },
                        { text: "Robust Risk Management", icon: "fas fa-shield-alt" },
                        { text: "Omni-Channel Access; Seamless API integration with existing systems", icon: "fas fa-cubes" },
                        { text: "Regulatory Compliance Support", icon: "fas fa-gavel" },
                        { text: "Advanced Data Visualization", icon: "fas fa-chart-pie" },
                        { text: "Operational Support", icon: "fas fa-headset" },
                        { text: "And much more.", icon: "fas fa-ellipsis-h" }
                    ].map((feature, index) => (
                        <AnimatedElement as="li" key={index} className="engineered-feature-item" animation="fadeInUpSmall" delay={0.2 + index * 0.05}>
                            <div className="engineered-feature-icon-wrapper">
                                <i className={`${feature.icon}`}></i>
                            </div>
                            <span className="engineered-feature-text">{feature.text}</span>
                        </AnimatedElement>
                    ))}
                </ul>
            </AnimatedElement>
        </div>
      </section>

      <section className="bridge-cta-section bridge-final-cta">
        <div className="container">
          <div className="bridge-cta-content">
            <AnimatedElement animation="fadeInUp" delay={0.3}>
              <h2 className="cta-title">Ready to Transform Your Liquidity and Investment Process?</h2>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={0.4}>
              <p className="cta-text">
                Experience the difference that world-class asset management can make for your institution. Contact us to schedule a introduction.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={0.5} className="cta-button-wrapper">
              <div className="bridge-cta-buttons">
                <NavLink to="/#contact" className="btn-primary">CONNECT</NavLink>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer /> 
    </div>
  );
};

export default BridgePlatformPage;