import React, { useEffect, useState } from 'react';

export const CartContent = () => {
  const [cartItems, setCartItems] = useState([]);


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

  return (
    <div>
      <div>{cartItems.length === 0 && <div>Ostoskori on tyhjä</div>}</div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>
            <button onClick={() => onAdd(item)}>+</button>
            <button onClick={() => onRemove(item)}>-</button>
          </div>
          <div>{item.qty} x {item.price}</div>
        </div>
      ))}
    </div>
  );
};
