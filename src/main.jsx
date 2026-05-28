import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Domain redirect logic
const currentHost = window.location.hostname;
const targetDomain = 'transwesterncapital.com';

if (currentHost !== targetDomain && currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
  const currentPath = window.location.pathname + window.location.search + window.location.hash;
  window.location.replace(`https://${targetDomain}${currentPath}`);
}

// Ensure DOM is ready before mounting React
const initApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    console.error('Root element not found');
  }
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}