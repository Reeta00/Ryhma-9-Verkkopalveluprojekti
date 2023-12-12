
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Style.css';


export const Admin = () => {
    const [title, setTitle] = useState('');
    const [publish, setPublish] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [bookList, setBookList] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [newCategory, setNewCategory] = useState('');

    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState();
    const [newAuthor, setNewAuthor] = useState('');

    const [img_url] = useState('')
    const [newDescription, setNewDescription] = useState('');

    const [showBooks, setShowBooks] = useState(false);



    //Lisää kirjan kantaan
    const addBook = () => {
        console.log(selectedAuthor, 'is authorid')
        console.log(selectedCategory, 'is categoryid')
        axios.post('http://localhost:3001/add', {
            title: title,
            author_id: selectedAuthor,
            publish: publish,
            product_description: description,
            category_id: selectedCategory,
            price: price,
            img_url: img_url
        }).then(() => {
            console.log('Succsess!')
        })
    };

    const getBooks = () => {
        if (showBooks) {
            axios.get("http://localhost:3001/books-with-categories-and-authors").then((response) => {
                setBookList(response.data);
            });
        }
    };

    const toggleBooksVisibility = () => {
        setShowBooks((prevShowBooks) => !prevShowBooks);
    };

    useEffect(() => {
        if (showBooks) {
            axios.get("http://localhost:3001/books-with-categories-and-authors").then((response) => {
                setBookList(response.data);
            });
        }
    }, [showBooks]);


    //Muuttaa kuvausta tietokannassa
    const updateDescription = (product_id) => {
        axios.put('http://localhost:3001/update', { product_description: newDescription, product_id: product_id }).then(
            (response) => {
                setBookList(bookList.map((val) => {
                    return val.product_id === product_id ? { product_id: val.product_id, title: val.title, author_id: val.author_id, publish: val.publish, product_description: newDescription, category_id: val.category_id, price: val.price } : val;
                }));
            });
    };

    const markAsBestseller = (product_id, is_bestseller) => {
        axios.put(`http://localhost:3001/bestsellers/${product_id}`, { is_bestseller })
            .then((response) => {
                console.log(response.data);
                getBooks();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:3001/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddCategory = () => {
        axios.post('http://localhost:3001/add-category', {
            name: newCategory
        }).then(response => {
            console.log(response.data);
            axios.get('http://localhost:3001/categories')
                .then(response => setCategories(response.data))
                .catch(error => console.error(error));
        })
            .catch(error => console.error(error));
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };



    useEffect(() => {
        axios.get('http://localhost:3001/authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddAuthor = () => {
        axios.post('http://localhost:3001/add-author', {
            author_name: newAuthor
        }).then(response => {
            console.log(response.data);
            axios.get('http://localhost:3001/authors')
                .then(response => setAuthors(response.data))
                .catch(error => console.error(error));
        })
            .catch(error => console.error(error));
    };

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    };

    //Poistaa tuotteen kannasta
    const deleteBook = (product_id) => {
        axios.delete(`http://localhost:3001/delete/${product_id}`).then((response) => {
            setBookList(bookList.filter((val) => {
                return val.product_id !== product_id
            }))
        })
    }



    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="info">
                        <div className="mb-3">
                            <label className="form-label">Kirjan nimi:</label>
                            <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kirjailija:</label>
                            <select className="form-select" value={selectedAuthor} onChange={handleAuthorChange}>
                                <option value="">Valitse kirjailija</option>
                                {authors.map(author => (
                                    <option key={author.author_id} value={author.author_id}>
                                        {author.author_name}
                                    </option>
                                ))}
                            </select>
                            <div className="input-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Lisää uusi kirjailija"
                                    value={newAuthor}
                                    onChange={(e) => setNewAuthor(e.target.value)}
                                />
                                <button className="btn btn-outline-secondary" onClick={handleAddAuthor}>Lisää kirjailija</button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Julkaisuvuosi:</label>
                            <input type="text" className="form-control" onChange={e => setPublish(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kirjan kuvaus:</label>
                            <input type="text" className="form-control" onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kirjan kategoria:</label>
                            <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="" >Valitse kategoria</option>
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <div className="input-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Lisää uusi kategoria"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <button className="btn btn-outline-secondary" onClick={handleAddCategory}>Lisää kategoria</button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Hinta:</label>
                            <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} />
                        </div>

                        <Button className="btn btn-primary" onClick={addBook}>
                            Lisää kirja
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Button className="btn btn-primary mb-3" onClick={toggleBooksVisibility}>
                        {showBooks ? 'Piilota kirjat' : 'Näytä kirjat'}
                    </Button>
                </Col>
                <Col md={12}>
                    {showBooks && (
                        <Row xs={1} md={4} lg={4} className="g-4">
                            {bookList.map((val) => (
                                <Col key={val.product_id}>
                                    <Card className="mb-3">
                                        <Card.Img
                                            variant="top"
                                            src={val.img_url}
                                            alt={val.title}
                                            className="book-cover-image"
                                        />
                                        <Card.Body>
                                            <Card.Title>Nimi: {val.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Kirjailija: {val.author_name}</Card.Subtitle>
                                            <Card.Text>Julkaisuvuosi: {val.publish}</Card.Text>
                                            <Card.Text>Kuvaus: {val.product_description}</Card.Text>
                                            <Card.Text>Kategoria: {val.category_name}</Card.Text>
                                            <Card.Text>Hinta: {val.price} €</Card.Text>

                                            <Form.Group className="mb-3">
                                                <Form.Control type="text" placeholder="Päivitä kuvausta" onChange={(e) => { setNewDescription(e.target.value) }} />
                                                <Button variant="outline-secondary" onClick={() => { updateDescription(val.product_id) }}>Päivitä kuvausta</Button>
                                                <Button variant="outline-secondary" onClick={() => { deleteBook(val.product_id) }}>Poista kirja</Button>
                                                <Button variant="outline-secondary" onClick={() => markAsBestseller(val.product_id, !val.is_bestseller)}>
                                                    {val.is_bestseller ? 'Poista myydyimmistä' : 'Merkkaa myydyimmäksi'}
                                                </Button>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                            <Col md={6}>
                                <Button className="btn btn-primary mb-3" onClick={toggleBooksVisibility}>
                                    {showBooks ? 'Piilota kirjat' : 'Näytä kirjat'}
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};