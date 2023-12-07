import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { HomeContext } from "./context/HomeContext";

export const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/books').then((response) => {
            setProducts(response.data);
        });
    }, []);

    //Tuodaan HomeContext.js:stä addToCart toiminto
    const { addToCart } = useContext(HomeContext);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Tervetuloa Novellinurkkaan!</h2>
            <Row>
                {products.map((val, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            <Card.Img className="custom-card-img" variant="top" src={`http://localhost:3000/${val.img_url}`} alt={val.title} />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                <Card.Text>
                                    Hinta: {val.price} €
                                </Card.Text>
                                <Button variant="outline-dark" onClick={() => addToCart(val.product_id)}>Lisää ostoskoriin</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};