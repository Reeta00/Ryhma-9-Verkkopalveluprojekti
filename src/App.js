import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductList } from './Home';
import { Admin } from './Admin';
import { Categories } from './Categories';
import { Login } from './Login';
import { BestSellers } from './Bestsellers';
import Header from './Header';
import Footer from './Footer';
import CartContent from './Cart';
import { HomeContextProvider } from './context/HomeContext';




// Main App component
const App = () => {
  return (
    <HomeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/productList' element={<ProductList />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/bestsellers' element={<BestSellers />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/cartcontent' element={<CartContent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HomeContextProvider>
  );
};

export default App;
