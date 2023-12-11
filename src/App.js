import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Admin } from './Admin';
import { CategoriesPage } from './Categories';
import { BooksList } from './Categories';
import { Login } from './Login';
import { BestSellers } from './Bestsellers';
import Header from './Header';
import Footer from './Footer';
import { CartContent } from './CartContent';
import getProductData from './ProductData';
import { Home } from './Home';



const App = () => {

  const { product } = getProductData;
  const [cartItems, setCartItems] = useState([]);
  const [/*totalPrice*/, setTotalPrice] = useState('');


  useEffect(() => {

    const getItemsFromLocalStorage = () => {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }
    };

    getItemsFromLocalStorage();
  }, []);

  console.log(cartItems);

  //Funktio, joka lisää tuotteen ostoskoriin
  const onAdd = (product) => {

    const storedCartItems = localStorage.getItem('cartItems');
    let existingCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

    const existingItem = existingCartItems.find((x) => x.id === product.id);

    if (existingItem) {

      existingItem.qty += 1;
    } else {

      existingCartItems.push({ ...product, qty: 1 });
    }

    existingCartItems = existingCartItems.map((item) => ({
      ...item,
      totalPrice: item.price * item.qty,
    }));

    const newTotalPrice = existingCartItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    setCartItems(existingCartItems);
    setTotalPrice(newTotalPrice);

    // Update localStorage with the latest cart items
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    localStorage.setItem('totalPrice', newTotalPrice);
  };

  //Funktio, joka poistaa tuotteen ostoskorista
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);

    let newCartItems;

    if (exist.qty === 1) {
      newCartItems = cartItems.filter((x) => x.id !== product.id);
    } else {
      newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1, totalPrice: exist.price * (exist.qty - 1) } : x
      );
    }

    const newTotalPrice = newCartItems.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    setCartItems(newCartItems);
    setTotalPrice(newTotalPrice);

    // Update localStorage with the latest cart items
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('totalPrice', newTotalPrice);
  };

  useEffect(() => {
    setCartItems(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home cartItems={cartItems} onAdd={onAdd} product={product} onRemove={onRemove} />} />
        <Route path='/home' element={<Home cartItems={cartItems} onAdd={onAdd} product={product} onRemove={onRemove} />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='/categories' element={<BooksList />} />
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

