// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const root = ReactDOM.createRoot(document.getElementById('root'));

// Use createRoot for rendering the entire application
root.render(

  <div>
    <App />
  </div>

);

