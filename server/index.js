require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.static('public'));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "groupNine",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expire: 60 * 60 * 24,
    },
})
);

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
    const description = req.body.product_description;
    db.query("UPDATE product SET product_description = ? WHERE product_id = ?",
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

//Login-sivun endpointit

app.post('/register', (req, res) => {

    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const user_email = req.body.user_email;

    bcrypt.hash(user_password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err)
        } else {
            res.send({ message: 'Rekisteröityminen onnistui! Kirjaudu sisään käyttäjätunnuksillasi!' })
        }

        db.query('INSERT INTO user_login (user_name, user_password, user_email) VALUES (?,?, ?)',
            [user_name, hash, user_email], (err, result) => {
                console.log(err);
            })
    })


});

app.get('/login', (req, res) => {
    if (req.session.user_name) {
        res.send({ loggedIn: true, user_name: req.session.user_name })
    } else {
        res.send({ loggedIn: false });
    }
})

app.post('/login', (req, res) => {
    const user_identifier = req.body.user_identifier;
    const user_password = req.body.user_password;

    db.query('SELECT * FROM user_login WHERE user_name = ? OR user_email = ?;',
        [user_identifier, user_identifier],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(user_password, result[0].user_password, (error, response) => {
                    if (response) {
                        req.session.user_name = result;
                        console.log(req.session.user_name);
                        res.send({ loggedIn: true, user_name: result[0].user_name });
                    } else {
                        res.send({ message: "Väärä käyttäjänimi tai salasana" });
                    }
                });
            } else {
                res.send({ loggedIn: false, message: "Käyttäjää ei löydy" });
            }
        });

});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send({ loggedIn: true });
        } else {
            res.clearCookie('userId');
            res.send({ loggedIn: false });
        }
    });
});

app.listen(3001, () => {
    console.log('Your server is running on port 3001!');
});