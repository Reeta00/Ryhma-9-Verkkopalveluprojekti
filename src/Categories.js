import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
     <br></br>
      {categories.map(category => (
        <div key={category.category_id}>
          <h3>{category.name}</h3>
          <BooksList category={category.name} />
        </div>
      ))}
    </Container>
  );
};

export const BooksList = ({ category }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/books/category/${category}`)
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, [category]);

  return (
    <Row>
      {books.map(book => (
        <Col key={book.product_id} md={4} className="mb-4">
          <Card>
            <Card.Img
              className="custom-card-img"
              variant="top"
              src={`http://localhost:3000/${book.img_url}`}  
              alt={book.title}
            />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Hinta: {book.price} €</Card.Text>
              <Button variant="outline-dark">Lisää ostoskoriin</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};



