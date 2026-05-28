import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import BridgePlatformPage from './pages/BridgePlatformPage';
import FinancialSolutionsPage from './pages/FinancialSolutionsPage';
import SMSPage      from './pages/SMSPage';
import IPAPage      from './pages/IPAPage';
import FundPage     from './pages/FundPage';
import ContactPage  from './pages/ContactPage';
import ResearchPage from './pages/ResearchPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="app">
        <NavBar />
        <Routes>
          <Route path="/"                              element={<HomePage />} />
          <Route path="/bridge-platform"               element={<BridgePlatformPage />} />
          <Route path="/financial-solutions"           element={<FinancialSolutionsPage />} />
          <Route path="/separately-managed-strategies" element={<SMSPage />} />
          <Route path="/investment-portfolio-advisory"  element={<IPAPage />} />
          <Route path="/fund-information"               element={<FundPage />} />
          <Route path="/contact"                        element={<ContactPage />} />
          <Route path="/research"                       element={<ResearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;