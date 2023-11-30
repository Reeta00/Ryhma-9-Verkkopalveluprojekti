
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';


export const Admin = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publish, setPublish] = useState('');
    const [description, setDescription] = useState('');
    const [category,] = useState('');
    const [price, setPrice] = useState('');

    const [bookList, setBookList] = useState([]);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');

    const [newDescription, setNewDescription] = useState('');

    //Lisää kirjan kantaan
    const addBook = () => {
        axios.post('http://localhost:3001/add', {
            title: title,
            author: author,
            publish: publish,
            description: description,
            category: category,
            price: price
        }).then(() => {
            console.log('Succsess!')
        })
    };

    //Hakee kannasta kaikki kirjat
    const getBooks = () => {
        axios.get('http://localhost:3001/books').then((response) => {

            //Muutetaan category_id näkymään id numeron sijaan kategorian nimenä
            const booksWithCategoryName = response.data.map((book) => {
                const category = categories.find((cat) => cat.category_id === book.category_id);
                return { ...book, category_name: category ? category.name : '' };
            });
            setBookList(booksWithCategoryName);
        });
    };

    //Muuttaa kuvausta tietokannassa
    const updateDescription = (product_id) => {
        axios.put('http://localhost:3001/update', { product_description: newDescription, product_id: product_id }).then(
            (response) => {
                setBookList(bookList.map((val) => {
                    return val.product_id === product_id ? { product_id: val.product_id, title: val.title, author_id: val.author_id, publish: val.publish, product_description: newDescription, category_id: val.category_id, price: val.price } : val;
                }));
            });
    };

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

    //Poistaa tuotteen kannasta
    const deleteBook = (product_id) => {
        axios.delete(`http://localhost:3001/delete/${product_id}`).then((response) => {
            setBookList(bookList.filter((val) => {
                return val.product_id !== product_id
            }))
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="info">
                        <h2>Ylläpitosivu. Ylläpitäjä saa lisättyä tästä kantaan kirjoja ja katsella mitä kirjoja jo löytyy ym. Hyvin keskeneräinen vielä..</h2>

                        <div className="mb-3">
                            <label className="form-label">Kirjan nimi:</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kirjailijan nimi:</label>
                            <input type="text" className="form-control" onChange={e => setAuthor(e.target.value)} />
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
                                <option value="" disabled>Valitse kategoria</option>
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.name}>
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

                        <button className="btn btn-primary" onClick={addBook}>Lisää kirja</button>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="books">
                        <button className="btn btn-primary mb-3" onClick={getBooks}>
                            Näytä kirjat
                        </button>

                        {bookList.map((val, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h3 className="card-title">Nimi: {val.title}</h3>
                                    <h3 className="card-subtitle mb-2 text-muted">Kirjailija: {val.author_id}</h3>
                                    <p className="card-text">Julkaisuvuosi: {val.publish}</p>
                                    <p className="card-text">Kuvaus: {val.product_description}</p>
                                    <p className="card-text">Kategoria: {val.category_name}</p>
                                    <p className="card-text">Hinta: {val.price} €</p>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Päivitä kuvausta" onChange={(e) => { setNewDescription(e.target.value) }} />
                                        <button className="btn btn-outline-secondary" onClick={() => { updateDescription(val.product_id) }}>Päivitä kuvausta</button>

                                        <button className="btn btn-outline-secondary" onClick={() => { deleteBook(val.product_id) }}>Poista kirja</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

};