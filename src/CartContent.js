import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Col, Container, Row, Image } from 'react-bootstrap'

export const CartContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');


  useEffect(() => {

    const getItemsFromLocalStorage = () => {
      const savedCartItems = localStorage.getItem('cartItems');
      const savedTotalPrice = localStorage.getItem('totalPrice');

      if (savedCartItems) {
        setCartItems(JSON.parse(savedCartItems));
      }

      if (savedTotalPrice) {
        setTotalPrice(savedTotalPrice);
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

    setTotalPrice(newTotalPrice);
    setCartItems(existingCartItems);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    localStorage.setItem('totalPrice', newTotalPrice.toString());
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

    setTotalPrice(newTotalPrice);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('totalPrice', newTotalPrice.toString());
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          {cartItems.length === 0 ? (
            <div>Ostoskori on tyhjä</div>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <Image
                      src={`http://localhost:3000/${item.img}`}
                      alt={item.title}
                      thumbnail
                      fluid
                      style={{ maxHeight: '80px' }}
                    />
                    <div>
                      <Button
                        variant="success"
                        onClick={() => onAdd(item)}
                        style={{ width: '30px', fontSize: '0.8rem' }}
                      >
                        +
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() => onRemove(item)}
                        style={{ width: '30px', fontSize: '0.8rem' }}
                      >
                        -
                      </Button>
                    </div>
                    <div>{item.qty} kpl</div>
                    <div>Hinta: {Number(item.totalPrice).toFixed(2)} €</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      {cartItems.length > 0 && (
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between">
              <strong>Hinta yhteensä: {Number(totalPrice).toFixed(2)}</strong>
              <Button variant="danger" onClick={clearCart}>
                Tyhjennä kori
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

