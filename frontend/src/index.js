import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure to import from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './styles.css';

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
