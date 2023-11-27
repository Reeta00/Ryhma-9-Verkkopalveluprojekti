// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Header from './Header';
import Footer from './Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Use createRoot for rendering the entire application
root.render(
  <React.StrictMode>
    <div>
      {/* Include your Header component */}
      <Header />

      {/* The rest of your React app content goes here */}
      <App />

      {/* Include your Footer component */}
      <Footer />
    </div>
  </React.StrictMode>
);

