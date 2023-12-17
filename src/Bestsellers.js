import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/bestsellers').then((response) => {
            setBestSellers(response.data);
        });
    }, []);

    const handleAddToCart = (book) => {
        // Similar logic as in CategoriesPage handleAddToCart
    
        const storedCartItems = localStorage.getItem('cartItems');
        let existingCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    
        const existingItem = existingCartItems.find((x) => x.product_id === book.product_id && x.qty === 1);
    
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          existingCartItems.push({ ...book, qty: 1 });
        }
    
        existingCartItems = existingCartItems.map((item) => ({
          ...item,
          totalPrice: item.price * item.qty,
          img: item.img_url,
        }));
    
        const newTotalPrice = existingCartItems.reduce((total, item) => {
          return total + item.price * item.qty;
        }, 0);
    
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
        localStorage.setItem('totalPrice', newTotalPrice.toString());
      };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Myydyimmät kirjat</h2>
            <Row>
                {bestSellers.map((val, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            <Card.Img
                                className="custom-card-img"
                                variant="top"
                                src={`http://localhost:3000/${val.img_url}`}
                                alt={val.title}
                            />
                           <Card.Body>
                            <Card.Title>{val.title}</Card.Title>
                            <Card.Text>Hinta: {val.price} €</Card.Text>
                            <Button variant="outline-dark" onClick={() => handleAddToCart(val)}>
                            Lisää ostoskoriin</Button>
                           </Card.Body>
                        </Card>
                     </Col>
                  ))}
              </Row>
         </Container>
    );
};
