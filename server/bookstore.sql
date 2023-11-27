CREATE DATABASE IF NOT EXISTS store_db;

USE store_db;

CREATE TABLE
    IF NOT EXISTS category(
        category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255)
    );

CREATE TABLE
    IF NOT EXISTS product(
        product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publish INT NOT NULL,
        description VARCHAR(900) NOT NULL,
        category VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(category_id)
    );

INSERT INTO category (name)
VALUES ('Sci-Fi'), ('Mysteeri'), ('Historia'), ('Fantasia'), ('Elämäkerta');

INSERT INTO
    product (
        title,
        author,
        publish,
        description,
        category,
        price
    )
VALUES (
        'Baskervillen koira',
        'Arthur Conan Doyle',
        1902,
        'Sir Charles Baskerville löytyy kuolleena Dartmoorin nummelta, ja hänen ystävänsä tohtori Mortimer uskoo yliluonnollisen koiran olevan syynä. Mortimer pyytää apua Sherlock Holmesilta suojellakseen Baskervillen perillistä Sir Henryä. Taustalla on Baskervillen kirous, jonka mukaan koiran sanotaan kostavan suvun historialliset vääryydet.',
        'Mysteeri',
        25.50
    ), (
        'Maailmojen sota',
        'H. G. Wells',
        1898,
        'Maailmojen sota on varhainen tieteisromaani, joka kertoo Marsista saapuvien avaruusolentojen hyökkäyksestä Englantiin. Se on yksi ensimmäisistä ja tunnetuimmista kuvauksista avaruusolentojen invaasiosta Maahan.',
        'Sci-Fi',
        10.00
    ), (
        'Liisan seikkailut ihmemaassa',
        'Lewis Carroll',
        1865,
        'Tarina kertoo Liisa-nimisestä tytöstä, joka putoaa kaninkolosta fantasiamaailmaan, missä asuu outoja ja antropomorfisia olentoja. Tarinassa on viittauksia Lewis Carrollin ystäviin ja vihollisiin sekä brittiläisten koululaisten opetuksiin. Se leikittelee logiikalla ja on suosittu sekä aikuisten että lasten keskuudessa. Tarina on merkittävä esimerkki kirjallisesta hölynpölystä ja on vaikuttanut merkittävästi fantasiagenreen.',
        'Fantasia',
        15.99
    ), (
        'The Road',
        'Jack London',
        1907,
        'Tarinoita Londonin ajoilta kulkurina.',
        'Elämäkerta',
        15.00
    ), (
        'Kuningas Juhana',
        'William Shakespeare',
        1623,
        'Kuningas Juhanan elämä ja kuolema on William Shakespearen kirjoittama historiallinen näytelmä, joka dramatisoi Englannin kuningas Juhanan elämää ja hallituskautta.',
        'Historia',
        35.20
    );