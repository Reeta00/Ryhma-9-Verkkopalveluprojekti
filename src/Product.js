
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import getProductData from './ProductData';

export const Product = (props) => {
    const { onAdd } = props;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductData();
            setProducts(data);
        };

        fetchData();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Tervetuloa Novellinurkkaan!</h2>
            <Row>
                {products.map((product) => (
                    < Col key={product.id} md={4} className="mb-4" >
                        <Card>
                            <Card.Img
                                className="custom-card-img"
                                variant="top"
                                src={`http://localhost:3000/${product.img}`}
                                alt={product.title}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    Hinta: {product.price} €
                                </Card.Text>
                                <Button
                                    variant="outline-dark"
                                    onClick={() => onAdd(product)}
                                >
                                    Lisää ostoskoriin
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container >

    );
};
/*export const ProductList = ({ addToCart }) => {

    const [product, setProduct] = useState([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/books');
                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Tervetuloa Novellinurkkaan!</h2>
            <Row>
                {product.map((val, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            <Card.Img className="custom-card-img" variant="top" src={`http://localhost:3000/${val.img_url}`} alt={val.title} />
                            <Card.Body>
                                <Card.Title>{val.title}</Card.Title>
                                <Card.Text>
                                    Hinta: {val.price} €
                                </Card.Text>
                                <Button variant="outline-dark" onClick={() => addToCart}>Lisää ostoskoriin</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}*/