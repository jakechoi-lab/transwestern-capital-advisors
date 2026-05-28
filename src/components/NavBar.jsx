import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { images } from '../assets/images';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [desktopDropdowns, setDesktopDropdowns] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdowns({});
    setDesktopDropdowns({});
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleMobileNavClick = (item, index, navigate) => {
    // If item has a path and we're not already on that page, navigate first
    if (item.path && location.pathname !== item.path) {
      navigate();
      return;
    }
    // Otherwise toggle dropdown
    toggleMobileDropdown(index);
  };

  const handleDesktopDropdownHover = (index, isHovering) => {
    setDesktopDropdowns(prev => ({
      ...prev,
      [index]: isHovering
    }));
  };

  const closeAllDropdowns = () => {
    setDesktopDropdowns({});
  };

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Core Solutions', path: '/separately-managed-strategies' },
    { title: 'Ancillary Services',  path: '/investment-portfolio-advisory' },
    {
      title: 'Financial Solutions',
      path: '/financial-solutions',
      dropdown: [
        { title: 'CECL Modeling',                 hash: '#cecl-modeling' },
        { title: 'Asset/Liability Modeling',      hash: '#alm-modeling' },
        { title: 'Fixed Income Accounting',       hash: '#portfolio-accounting' },
        { title: 'Deposit Analysis',              hash: '#deposit-analysis' },
        { title: 'Liquidity Testing & Reporting', hash: '#liquidity-testing' },
        { title: 'Mergers & Acquisitions',        hash: '#ma-advisory' },
        { title: 'Strategic Planning',            hash: '#strategic-planning' }
      ]
    }
  ];

  const renderDropdown = (items, parentIndex) => (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>
          {item.path ? (
            <Link 
              to={item.path} 
              className="dropdown-item"
              onClick={() => handleDesktopDropdownHover(parentIndex, false)}
            >
              {item.title}
            </Link>
          ) : item.anchor ? (
            <a 
              href={item.anchor} 
              className="dropdown-item"
              onClick={() => handleDesktopDropdownHover(parentIndex, false)}
            >
              {item.title}
            </a>
          ) : (
            <Link 
              to={`/financial-solutions${item.hash}`} 
              className="dropdown-item"
              onClick={() => handleDesktopDropdownHover(parentIndex, false)}
            >
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  const renderMobileDropdown = (items, key) => (
    <ul className={`mobile-dropdown-menu ${mobileDropdowns[key] ? 'open' : ''}`}>
      {items.map((item, idx) => (
        <li key={idx}>
          {item.path ? (
            <Link to={item.path} className="mobile-dropdown-item">
              {item.title}
            </Link>
          ) : item.anchor ? (
            <a href={item.anchor} className="mobile-dropdown-item">
              {item.title}
            </a>
          ) : (
            <Link to={`/financial-solutions${item.hash}`} className="mobile-dropdown-item">
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="nav-container">
        <nav id="main-nav" role="navigation">
          <div className="nav-inner">
            <Link className="logo" to="/" aria-label="TransWestern Capital Advisors, LLC Home">
              <img
                src={images.logoTransparentCapitalAdvisors}
                alt="TransWestern Capital Advisors, LLC Logo"
                className="header-logo-img"
              />
              <span className="logo-text">TransWestern Capital</span>
            </Link>
            
            <button 
              id="menu-btn" 
              className={mobileMenuOpen ? 'open' : ''}
              aria-label="Toggle Menu" 
              aria-expanded={mobileMenuOpen} 
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
            >
              <span></span><span></span><span></span>
            </button>
            
            <div className="nav-links-wrapper">
              <ul id="nav-links" className="nav-links">
                {navItems.map((item, index) => (
                  <li 
                    key={index} 
                    className="nav-item"
                    onMouseEnter={() => item.dropdown && handleDesktopDropdownHover(index, true)}
                    onMouseLeave={() => item.dropdown && handleDesktopDropdownHover(index, false)}
                  >
                    {item.dropdown ? (
                      <>
                        {item.path ? (
                          <Link 
                            to={item.path} 
                            className={`nav-link dropdown-toggle ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={(e) => {
                              closeAllDropdowns();
                              // Allow navigation to proceed
                            }}
                          >
                            {item.title}
                          </Link>
                        ) : (
                          <span className="nav-link dropdown-toggle">
                            {item.title}
                          </span>
                        )}
                        <div className={`dropdown-menu ${desktopDropdowns[index] ? 'show' : ''}`}>
                          {renderDropdown(item.dropdown, index)}
                        </div>
                      </>
                    ) : item.anchor ? (
                      <Link 
                        to={`/${item.anchor}`} 
                        className="nav-link"
                        onClick={(e) => {
                          // If we're already on homepage, just scroll
                          if (location.pathname === '/') {
                            e.preventDefault();
                            const element = document.querySelector(item.anchor);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="nav-item">
                  <Link to="/contact" className="btn-nav-contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
      
      <nav id="mobile-menu" className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="mobile-menu-close-btn" 
          onClick={toggleMobileMenu}
          aria-label="Close Menu"
        >
          <i className="fas fa-times"></i>
        </button>
        
        <ul className="mobile-nav-links">
          {navItems.map((item, index) => (
            <li key={index} className="mobile-nav-item">
              {item.dropdown ? (
                <>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`mobile-nav-link dropdown-toggle ${mobileDropdowns[index] ? 'open' : ''} ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavClick(item, index, () => {
                          // Navigate to the page and close mobile menu
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        });
                      }}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <a 
                      href="#"
                      className={`mobile-nav-link dropdown-toggle ${mobileDropdowns[index] ? 'open' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMobileDropdown(index);
                      }}
                    >
                      {item.title}
                    </a>
                  )}
                  {renderMobileDropdown(item.dropdown, index)}
                </>
              ) : item.anchor ? (
                <Link 
                  to={`/${item.anchor}`} 
                  className="mobile-nav-link"
                  onClick={(e) => {
                    // If we're already on homepage, just scroll and close menu
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const element = document.querySelector(item.anchor);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      setMobileMenuOpen(false);
                    } else {
                      // Navigate to homepage with anchor and close menu
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.title}
                </Link>
              ) : (
                <Link to={item.path} className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                  {item.title}
                </Link>
              )}
            </li>
          ))}
          <li className="mobile-nav-item">
            <Link to="/contact" className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;