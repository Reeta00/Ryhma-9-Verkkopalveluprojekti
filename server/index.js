require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

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
    const author = req.body.author;
    const publish = req.body.publish;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;

    db.query('INSERT INTO product (title, author, publish, description, category, price) VALUES (?, ?, ?, ?, ?, ?)',
        [title, author, publish, description, category, price], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Values inserted');
            }
        }
    );

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


app.get("/categories", (req, res) => {
    db.query("SELECT * FROM category", (err, result) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
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
    })
})


app.listen(3001, () => {
    console.log('Your server is running on port 3001!');
});