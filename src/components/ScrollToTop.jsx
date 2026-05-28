import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // If there's a hash (like #contact), don't scroll to top
    if (hash) {
      // Let the page handle the hash navigation
      return;
    }
    
    // Always scroll to top when navigating, even to the same page
    // The 'key' changes on every navigation, including to the same page
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;