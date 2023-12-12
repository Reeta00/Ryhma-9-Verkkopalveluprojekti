require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.post('/add', (req, res) => {
    const title = req.body.title;
    const author_id = req.body.author_id;
    const publish = req.body.publish;
    const product_description = req.body.product_description;
    const category_id = req.body.category_id;
    const price = req.body.price;
    const img_url = req.body.img_url;

    db.query('INSERT INTO product (title, author_id, publish, product_description, category_id, price, img_url) VALUES (?,?, ?, ?, ?, ?, ?)',
        [title, author_id, publish, product_description, category_id, price, img_url], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Values inserted');
            }
        }
    );

});

app.get('/books-with-categories-and-authors', (req, res) => {
    const query = `
        SELECT p.*, c.name as category_name, a.author_name
        FROM product p
        JOIN category c ON p.category_id = c.category_id
        JOIN author a ON p.author_id = a.author_id;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json(result);
        }
    });
});


app.get('/books-with-categories', (req, res) => {
    db.query('SELECT p.*, c.name as category_name FROM product p JOIN category c ON p.category_id = c.category_id', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json(result);
        }
    });
});


app.get("/books", (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/authors", (req, res) => {
    db.query("SELECT * FROM author", (err, result) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
        }
    });
});

app.get("/categories", (req, res) => {
    db.query("SELECT * FROM category", (err, result) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
        }
    });
});

app.get("/books/category/:category", (req, res) => {
    const { category } = req.params;

    db.query("SELECT * FROM product WHERE category_id IN (SELECT category_id FROM category WHERE name = ?)", [category], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
        }
    });
});

app.post("/add-author", (req, res) => {
    const author_name = req.body.author_name;

    db.query('INSERT INTO author (author_name) VALUES (?)', [author_name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.send('author added')
        }
    });
});

app.post("/add-category", (req, res) => {
    const name = req.body.name;

    db.query('INSERT INTO category (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.send('category added')
        }
    });
});

app.put('/update', (req, res) => {
    const product_id = req.body.product_id;
    const description = req.body.description;
    db.query("UPDATE product SET description = ? WHERE product_id = ?",
        [description, product_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.delete('/delete/:product_id', (req, res) => {
    const product_id = req.params.product_id
    db.query("DELETE FROM product WHERE product_id = ?", product_id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    });
});

app.get('/bestsellers', (req, res) => {
    const query = 'SELECT * FROM product WHERE is_bestseller = true';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.send(result);
        }
    });
});

app.put('/bestsellers/:product_id', (req, res) => {
    const { product_id } = req.params;
    const { is_bestseller } = req.body;

    const query = 'UPDATE product SET is_bestseller = ? WHERE product_id = ?';

    db.query(query, [is_bestseller, product_id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(3001, () => {
    console.log('Your server is running on port 3001!');
});