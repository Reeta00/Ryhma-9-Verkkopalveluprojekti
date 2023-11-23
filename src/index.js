// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Header from './Header';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
