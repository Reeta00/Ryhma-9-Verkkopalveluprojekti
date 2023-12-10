import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Admin } from './Admin';
import { Categories } from './Categories';
import { Login } from './Login';
import { BestSellers } from './Bestsellers';
import Header from './Header';
import Footer from './Footer';
import { CartContent } from './CartContent';
import { Home } from './Home';
import getProductData from './ProductData';

const App = () => {

  const { product } = getProductData;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {

    const storedCartItems = localStorage.getItem('cartItems');
    let existingCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

    const existingItem = existingCartItems.find((x) => x.id === product.id);

    if (existingItem) {

      existingItem.qty += 1;
    } else {

      existingCartItems.push({ ...product, qty: 1 });
    }

    setCartItems(existingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {

      const newCartItems = cartItems.filter((x) => x.id !== product.id);
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } else {

      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  };

  /*const onAdd = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...existingProduct, qty: existingProduct.qty + 1 } : item
      )
      );
    } else {
      const newCartItems = [...cartItems, { ...product, qty: 1 }];
      console.log(product)
      console.log(newCartItems)
      setCartItems(newCartItems)
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      //setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };*/

  useEffect(() => {
    setCartItems(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home cartItems={cartItems} onAdd={onAdd} product={product} onRemove={onRemove} />} />
        <Route path='/home' element={<Home cartItems={cartItems} onAdd={onAdd} product={product} onRemove={onRemove} />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/bestsellers' element={<BestSellers />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cartcontent' element={<CartContent cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

