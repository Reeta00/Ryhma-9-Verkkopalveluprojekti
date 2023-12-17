DROP DATABASE store_db;

CREATE DATABASE store_db;

USE store_db;

CREATE TABLE
    category(
        category_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255)
    );

INSERT INTO category (name)
VALUES ('Sci-Fi'), ('Mysteeri'), ('Historia'), ('Fantasia'), ('Elämäkerta');

CREATE TABLE
    author (
        author_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        author_name VARCHAR(255) NOT NULL
    );

INSERT INTO
    author (author_name)
VALUES ('Arthur Conan Doyle'), ('H. G. Wells'), ('Lewis Carroll'), ('Jack London'), ('William Shakespeare'), ('Edgar Allan Poe'), ('Jules Verne'), ('Peter Watts'), ('Andrew Lang'), ('Mark Twain'), ('Alexandre Dumas');

CREATE TABLE
    product(
        product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        author_id INT NOT NULL,
        publish INT NOT NULL,
        product_description VARCHAR(900) NOT NULL,
        category_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        img_url VARCHAR(255),
        FOREIGN KEY (category_id) REFERENCES category(category_id),
        FOREIGN KEY (author_id) REFERENCES author(author_id)
    );

ALTER TABLE product
ADD
    COLUMN is_bestseller BOOLEAN DEFAULT false;

INSERT INTO
    product (
        title,
        author_id,
        publish,
        product_description,
        category_id,
        price,
        img_url
    )
VALUES (
        'Baskervillen koira',
        1,
        1902,
        'Sir Charles Baskerville löytyy kuolleena Dartmoorin nummelta, ja hänen ystävänsä tohtori Mortimer uskoo yliluonnollisen koiran olevan syynä. Mortimer pyytää apua Sherlock Holmesilta suojellakseen Baskervillen perillistä Sir Henryä. Taustalla on Baskervillen kirous, jonka mukaan koiran sanotaan kostavan suvun historialliset vääryydet.',
        2,
        25.50,
        'covers/mysteeri/Baskerville.jpg'
    ), (
        'Maailmojen sota',
        2,
        1898,
        'Maailmojen sota on varhainen tieteisromaani, joka kertoo Marsista saapuvien avaruusolentojen hyökkäyksestä Englantiin. Se on yksi ensimmäisistä ja tunnetuimmista kuvauksista avaruusolentojen invaasiosta Maahan.',
        1,
        10.00,
        'covers/scifi/Maailmojensota.jpg'
    ), (
        'Liisan seikkailut ihmemaassa',
        3,
        1865,
        'Tarina kertoo Liisa-nimisestä tytöstä, joka putoaa kaninkolosta fantasiamaailmaan, missä asuu outoja ja antropomorfisia olentoja. Tarinassa on viittauksia Lewis Carrollin ystäviin ja vihollisiin sekä brittiläisten koululaisten opetuksiin. Se leikittelee logiikalla ja on suosittu sekä aikuisten että lasten keskuudessa. Tarina on merkittävä esimerkki kirjallisesta hölynpölystä ja on vaikuttanut merkittävästi fantasiagenreen.',
        4,
        15.99,
        'covers/fantasia/Ihmemaa.jpg'
    ), (
        'The Road',
        4,
        1907,
        'Tarinoita Londonin ajoilta kulkurina.',
        5,
        15.00,
        'covers/elamakerta/Theroad.jpg'
    ), (
        'Kuningas Juhana',
        5,
        1623,
        'Kuningas Juhanan elämä ja kuolema on William Shakespearen kirjoittama historiallinen näytelmä, joka dramatisoi Englannin kuningas Juhanan elämää ja hallituskautta.',
        3,
        35.20,
        'covers/historia/Juhana.jpg'
    ), (
        'Rue Morguen murhat',
        6,
        1841,
        'Tarina seuraa Pariisissa asuvaa C. Auguste Dupin -hahmoa, joka ratkaisee kahden naisen brutaalin murhan arvoituksen. Dupin käyttää nerokasta päättelykykyään, kun lukuisat silminnäkijät ovat kuulleet epäillyn, mutta kukaan ei ymmärrä, mitä kieltä puhuttiin.',
        2,
        12.00,
        'covers/mysteeri/RueMorgue.jpg'
    ), (
        'Matka maan keskipisteeseen',
        7,
        1864,
        'Tarinassa professori johdattaa veljenpoikansa ja palkatun oppaansa Islannissa sijaitsevan tulivuoren kautta "maapallon keskipisteeseen". He kohtaavat monia seikkailuja, kuten esihistoriallisia eläimiä ja luonnonkatastrofeja, ja päätyvät lopulta takaisin maan pinnalle Etelä-Italiassa. ',
        1,
        45.00,
        'covers/scifi/Keskipiste.jpg'
    ), (
        'Sokeanäkö',
        8,
        2006,
        'Erikoisjoukko lähetetään selvittämään avaruusluotaimesta kantautuvan signaalin alkuperää. Ryhmässä on monstereita, vampyyreja ja identiteettihäiriöistä kärsiviä erikoisosaajia. Heidän tehtävänään on kohdata älykkyys, jonka motiivit ovat tuntemattomat, ja selvittää mitä on sen kommunikaation takana.',
        1,
        15.00,
        'covers/scifi/Blindsight.jpg'
    ), (
        'Behemoth',
        8,
        2004,
        'Lenie Clarke, amfibinen syvänmeren kyborgi, on tuhonnut maailman vapauttamalla Behemoth-mikrobin. Nyt hänen on kohdattava seuraukset ja lunastettava aiheuttamansa sotku, kun maailma on raunioina.',
        1,
        25.50,
        'covers/scifi/Behemoth.jpg'
    ), (
        'Sininen keijukirja',
        9,
        1889,
        'Andrew Langin  satukirjat muodostavat kahdentoista kirjan sarjan satukokoelmia. Sininen satukirja sisältää seitsemän Grimmin veljesten tarinaa, viisi Madame d`Aulnoyn tarinaa, kolme tarinaa Arabian öistä ja neljä norjalaista tarinaa.',
        4,
        32.00,
        'covers/fantasia/Fairy.jpg'
    ), (
        'The Thousand-and-Second Tale of Scheherazade',
        6,
        1845,
        'Tarina kuvaa Sinbad merimiehen kahdeksatta ja viimeistä matkaa, johon liittyy erilaisia mysteerejä, jotka Sinbad ja hänen miehistönsä kohtaavat.',
        4,
        19.99,
        'covers/fantasia/Sinbad.jpg'
    ), (
        'Liisan seikkailut peilimaassa',
        3,
        1871,
        'Kirja on jatko-osa teokselle Liisan seikkailut ihmemaassa. Teoksen teemat ja tapahtumapaikat tekevät eräänlaisen peilikuvan Ihmemaasta. Liisa ihmemaassa-kirjassa käytetään kokoa ja pelikortteja juonikuvana, kun taas tässä teoksessa korostuvat peiliteemat, kuten vastakohdat ja taaksepäin kulkeva aika.',
        4,
        28.00,
        'covers/fantasia/Peilimaa.jpg'
    ), (
        'Henkilökohtaisia muistoja Jeanne d`Arcista',
        10,
        1896,
        'Teos on esitetty fiktiivisesti Sieur Louis de Conten, Jeanne d`Arcin palvelijan ja sihteerin, käsikirjoituksena. Louis de Conte on kuvitteellinen hahmo, joka edustaa Jeanne d`Arcin elämää kolmessa merkittävässä vaiheessa.',
        5,
        30.25,
        'covers/elamakerta/Jeanne.jpg'
    ), (
        'Elämä Mississipillä',
        10,
        1883,
        'Elämä Mississipillä on Mark Twainin muistelmateos, joka kertoo yksityiskohtaisesti hänen ajastaan höyrylaivan luotsina Mississippi-joella ennen ja jälkeen Yhdysvaltain sisällissodan.',
        3,
        14.99,
        'covers/historia/Mississippi.jpg'
    ), (
        'Nisida',
        11,
        1840,
        '"Nisida" on osa Dumasin "Juhlittuja rikoksia" -sarjaa ja kiehtova katsaus kunniaan ja oikeuteen 1800-luvun Italiassa. Se perustuu tositapahtumiin ja on kirjoitettu yhdessä italialaisen kirjailijan Pier Angelo Fiorentinon kanssa',
        3,
        48.00,
        'covers/historia/Nisida.jpg'
    );

CREATE TABLE
    user_login (
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user_name VARCHAR(255) NOT NULL,
        user_password VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        user_role VARCHAR(255) DEFAULT 'user'
    );