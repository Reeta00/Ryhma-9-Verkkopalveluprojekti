import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductList } from './Home';
import { Admin } from './Admin';
import { Categories } from './Categories';
import Cart from './Cart';
import { Login } from './Login';



// Main App component
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/productList' element={<ProductList />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
