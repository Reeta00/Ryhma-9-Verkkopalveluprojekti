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
        category_id INT NOT NULL,
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
        category_id,
        price
    );

VALUES (
        'Baskervillen koira',
        'Arthur Conan Doyle',
        1902,
        'Sir Charles Baskerville löytyy kuolleena Dartmoorin nummelta, ja hänen ystävänsä tohtori Mortimer uskoo yliluonnollisen koiran olevan syynä. Mortimer pyytää apua Sherlock Holmesilta suojellakseen Baskervillen perillistä Sir Henryä. Taustalla on Baskervillen kirous, jonka mukaan koiran sanotaan kostavan suvun historialliset vääryydet.',
        2,
        25.50
    ), (
        'Maailmojen sota',
        'H. G. Wells',
        1898,
        'Maailmojen sota on varhainen tieteisromaani, joka kertoo Marsista saapuvien avaruusolentojen hyökkäyksestä Englantiin. Se on yksi ensimmäisistä ja tunnetuimmista kuvauksista avaruusolentojen invaasiosta Maahan.',
        1,
        10.00
    ), (
        'Liisan seikkailut ihmemaassa',
        'Lewis Carroll',
        1865,
        'Tarina kertoo Liisa-nimisestä tytöstä, joka putoaa kaninkolosta fantasiamaailmaan, missä asuu outoja ja antropomorfisia olentoja. Tarinassa on viittauksia Lewis Carrollin ystäviin ja vihollisiin sekä brittiläisten koululaisten opetuksiin. Se leikittelee logiikalla ja on suosittu sekä aikuisten että lasten keskuudessa. Tarina on merkittävä esimerkki kirjallisesta hölynpölystä ja on vaikuttanut merkittävästi fantasiagenreen.',
        4,
        15.99
    ), (
        'The Road',
        'Jack London',
        1907,
        'Tarinoita Londonin ajoilta kulkurina.',
        5,
        15.00
    ), (
        'Kuningas Juhana',
        'William Shakespeare',
        1623,
        'Kuningas Juhanan elämä ja kuolema on William Shakespearen kirjoittama historiallinen näytelmä, joka dramatisoi Englannin kuningas Juhanan elämää ja hallituskautta.',
        3,
        35.20
    );

/* Tässä alla uusia kirjoja ja niille uusi kuvakolumni + kansikuvat */

INSERT INTO
    product (
        title,
        author,
        publish,
        description,
        category_id,
        price
    )
VALUES (
        'Rue Morguen murhat',
        'Edgar Allan Poe',
        1841,
        'Tarina seuraa Pariisissa asuvaa C. Auguste Dupin -hahmoa, joka ratkaisee kahden naisen brutaalin murhan arvoituksen. Dupin käyttää nerokasta päättelykykyään, kun lukuisat silminnäkijät ovat kuulleet epäillyn, mutta kukaan ei ymmärrä, mitä kieltä puhuttiin.',
        2,
        12.00
    ), (
        'Matka maan keskipisteeseen',
        'Jules Verne',
        1864,
        'Tarinassa professori johdattaa veljenpoikansa ja palkatun oppaansa Islannissa sijaitsevan tulivuoren kautta "maapallon keskipisteeseen". He kohtaavat monia seikkailuja, kuten esihistoriallisia eläimiä ja luonnonkatastrofeja, ja päätyvät lopulta takaisin maan pinnalle Etelä-Italiassa. ',
        1,
        45.00
    ), (
        'Sokeanäkö',
        'Peter Watts',
        2006,
        'Erikoisjoukko lähetetään selvittämään avaruusluotaimesta kantautuvan signaalin alkuperää. Ryhmässä on monstereita, vampyyreja ja identiteettihäiriöistä kärsiviä erikoisosaajia. Heidän tehtävänään on kohdata älykkyys, jonka motiivit ovat tuntemattomat, ja selvittää mitä on sen kommunikaation takana.',
        1,
        15.00
    ), (
        'Behemoth',
        'Peter Watts',
        2004,
        'Lenie Clarke, amfibinen syvänmeren kyborgi, on tuhonnut maailman vapauttamalla Behemoth-mikrobin. Nyt hänen on kohdattava seuraukset ja lunastettava aiheuttamansa sotku, kun maailma on raunioina.',
        1,
        25.50
    ), (
        'Sininen keijukirja',
        'Andrew Lang',
        1889,
        'Andrew Langin  satukirjat muodostavat kahdentoista kirjan sarjan satukokoelmia. Sininen satukirja sisältää seitsemän Grimmin veljesten tarinaa, viisi Madame d`Aulnoyn tarinaa, kolme tarinaa Arabian öistä ja neljä norjalaista tarinaa.',
        4,
        32.00
    ), (
        'The Thousand-and-Second Tale of Scheherazade',
        'Edgar Allan Poe',
        1845,
        'Tarina kuvaa Sinbad merimiehen kahdeksatta ja viimeistä matkaa, johon liittyy erilaisia mysteerejä, jotka Sinbad ja hänen miehistönsä kohtaavat.',
        4,
        19.99
    ), (
        'Liisan seikkailut peilimaassa',
        'Lewis Carroll',
        1871,
        'Kirja on jatko-osa teokselle Liisan seikkailut ihmemaassa. Teoksen teemat ja tapahtumapaikat tekevät eräänlaisen peilikuvan Ihmemaasta. Liisa ihmemaassa-kirjassa käytetään kokoa ja pelikortteja juonikuvana, kun taas tässä teoksessa korostuvat peiliteemat, kuten vastakohdat ja taaksepäin kulkeva aika.',
        4,
        28.00
    ), (
        'Henkilökohtaisia muistoja Jeanne d`Arcista',
        'Mark Twain',
        1896,
        'Teos on esitetty fiktiivisesti Sieur Louis de Conten, Jeanne d`Arcin palvelijan ja sihteerin, käsikirjoituksena. Louis de Conte on kuvitteellinen hahmo, joka edustaa Jeanne d`Arcin elämää kolmessa merkittävässä vaiheessa.',
        5,
        30.25
    ), (
        'Elämä Mississipillä',
        'Mark Twain',
        1883,
        'Elämä Mississipillä on Mark Twainin muistelmateos, joka kertoo yksityiskohtaisesti hänen ajastaan höyrylaivan luotsina Mississippi-joella ennen ja jälkeen Yhdysvaltain sisällissodan.',
        3,
        14.99
    ), (
        'Nisida',
        'Alexandre Dumas',
        1840,
        '"Nisida" on osa Dumasin "Juhlittuja rikoksia" -sarjaa ja kiehtova katsaus kunniaan ja oikeuteen 1800-luvun Italiassa. Se perustuu tositapahtumiin ja on kirjoitettu yhdessä italialaisen kirjailijan Pier Angelo Fiorentinon kanssa',
        3,
        48.00
    )

ALTER TABLE product ADD COLUMN img_url VARCHAR(255);

UPDATE product
SET
    img_url = 'covers/mysteeri/Baskerville.jpg'
WHERE product_id = 1;

UPDATE product
SET
    img_url = 'covers/scifi/Maailmojensota.jpg'
WHERE product_id = 2;

UPDATE product
SET
    img_url = 'covers/fantasia/Ihmemaa.jpg'
WHERE product_id = 3;

UPDATE product
SET
    img_url = 'covers/elamakerta/Theroad.jpg'
WHERE product_id = 4;

UPDATE product
SET
    img_url = 'covers/historia/Juhana.jpg'
WHERE product_id = 5;

UPDATE product
SET
    img_url = 'covers/mysteeri/RueMorgue.jpg'
WHERE product_id = 6;

UPDATE product
SET
    img_url = 'covers/scifi/Keskipiste.jpg'
WHERE product_id = 7;

UPDATE product
SET
    img_url = 'covers/scifi/Blindsight.jpg'
WHERE product_id = 8;

UPDATE product
SET
    img_url = 'covers/scifi/Behemoth.jpg'
WHERE product_id = 9;

UPDATE product
SET
    img_url = 'covers/fantasia/Fairy.jpg'
WHERE product_id = 10;

UPDATE product
SET
    img_url = 'covers/fantasia/Sinbad.jpg'
WHERE product_id = 11;

UPDATE product
SET
    img_url = 'covers/fantasia/Peilimaa.jpg'
WHERE product_id = 12;

UPDATE product
SET
    img_url = 'covers/elamakerta/Jeanne.jpg'
WHERE product_id = 13;

UPDATE product
SET
    img_url = 'covers/historia/Mississippi.jpg'
WHERE product_id = 14;

UPDATE product
SET
    img_url = 'covers/historia/Nisida.jpg'
WHERE product_id = 15;