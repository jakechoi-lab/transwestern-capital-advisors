import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { images } from '../assets/images';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If on homepage, just scroll
      const element = document.querySelector(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on another page, navigate to homepage with hash
      navigate('/' + anchor);
    }
  };
  return (
    <footer className="site-footer">
      <div className="footer-container" data-animation="fadeInUp" data-animation-duration="1">
        <div className="footer-logo">
          <Link className="logo" to="/" aria-label="TransWestern Capital Advisors, LLC Home">
            <img
              src={images.logoTransparentCapitalAdvisorsFooter}
              alt="TransWestern Capital Advisors, LLC Logo"
              className="footer-logo-img"
            />
          </Link>
        </div>
        
        <nav className="footer-links-nav" aria-label="Footer navigation">
          <ul className="footer-links">
            <li><Link to="/separately-managed-strategies">Separately Managed Strategies</Link></li>
            <li><Link to="/financial-solutions">Ancillary Services</Link></li>
            <li><Link to="/bridge-platform">BRIDGE Platform</Link></li>
            <li><Link to="/fund-information">Fund</Link></li>
            <li><a href="#purpose" onClick={(e) => handleAnchorClick(e, '#purpose')}>About Us</a></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            <li><a href="/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a></li>
          </ul>
        </nav>
        
        <div className="footer-info">
          <p>© 2026 TransWestern Capital Advisors LLC. All Rights Reserved.</p>
          <small>
            This website is for informational purposes only and intended for institutional investors. It does not constitute an offer to sell securities or investment advice. Past performance is not indicative of future results. Investment involves risk, including the possible loss of principal. Please consult with your financial advisor before making any investment decisions.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
