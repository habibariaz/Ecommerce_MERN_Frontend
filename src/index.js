import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
     <HashRouter>
        <App />
      </HashRouter>
    </CartProvider>
  </AuthProvider>

);

reportWebVitals();
