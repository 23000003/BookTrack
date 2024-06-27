CREATE DATABASE midtermPrac;
USE midtermPrac;

CREATE TABLE category(
    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name varchar(30) NOT NULL
);

CREATE TABLE genre(
    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type varchar(30) NOT NULL,
);

CREATE TABLE videoFile(
    idx int(11) PRIMARY AUTO_INCREMENT NOT NULL,
    file_path_reg varchar(50) NOT NULL, --//check if theres file type in phpadmin
);

CREATE TABLE shows(
    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title varchar(30) NOT NULL,
    description varchar(255) NOT NULL, --//Check if theres text in sql phpadmin
    length_min int(11),
    year int(4) NOT NULL, --// Check if theres year in sql
    type int(11) NOT NULL,
    video_src int(11) NOT NULL,
    FOREIGN KEY (type) REFERENCES category(id),
    FOREIGN KEY (video_src) REFERENCES videoFile(idx)
);

CREATE TABLE tv_series(
    tv_idx int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id int(11) NOT NULL,
    season int(11) NOT NULL,
    FOREIGN KEY (id) REFERENCES shows(id)
);

CREATE TABLE episodes(
    idx int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tv_id int(11) NOT NULL,
    ep_title varchar(50) NOT NULL,
    ep_num int(11) NOT NULL,
    length_min int(11) NOT NULL,
    video_src int(11) NOT NULL,
    FOREIGN KEY (video_src) REFERENCES videoFile(idx),
    FOREIGN KEY (tv_id) REFERENCES tv_series(tv_idx)
);

CREATE TABLE show_genre(
    idx int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    genre_id int(11) NOT NULL,
    vid_id int(11) NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genre(id),
    FOREIGN KEY (vid_id) REFERENCES videoFile(idx)
);

CREATE TABLE member(
    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email varchar(70) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL DEFAULT 'Male',
    city varchar(30) NOT NULL,
    state varchar(20),
    country varchar(50) NOT NULL
);

CREATE TABLE viewHistory(
    id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    view_date date DEFAULT now(),
    member_id int(11) NOT NULL,
    video_id int(11) NOT NULL,
    FOREIGN KEY member_id REFERENCES member(id),
    FOREIGN KEY (video_id) REFERENCES videoFile(idx)
);


INSERT INTO category(name)
VALUES
('TV Series'),
('Movie'),
('Documentary');

INSERT INTO genre(type)
VALUES
('Nature'),
('Romance'),
('Asian'),
('Kdrama'),
('Adventure'),
('Comedy'),
('SciFi'),
('Action');

INSERT INTO shows(title, description, length_min, year, type, video_src)
VALUES
('Kung Fu Panda', 'A lost panda who was good in fighting finds a turtle.' 120, 2015, 2 ,1),
('Matrix', 'Everything is a computer simulation.', 180, 2008, 2, 2),
('Running Man', 'Run and have fun', '', 2011, 1, ''), --//check what to insert if its empty
('Dragon Ball Z vs One Piece', 'Goku meets Luffy. Fought over food.', 120, 1985, 2, 3),
('Ancient Civilization', 'Aliens exist.', '', 2012, 1, '');

INSERT INTO tv_series(id, season)
VALUES
(3, 1),
(5, 1),
(3, 2);

INSERT INTO episodes(tv_id, ep_title, ep_num, length_min, video_src)
VALUES
(1, 'Meet the cast!', 1, 30, 4),
(1, 'Run for your life.', 2, 45, 5),
(2, 'Area 51', 1, 25, 6),
(2, 'Are Atlantians Aliens?', 2, 25, 7),
(3, 'We are Back!', 1, 45, 8);

INSERT INTO videoFile(file_path_reg)
VALUES
('movie/12345.mp4'),
('movie/bnv345.mp4'),
('movie/12ds345.mp4'),
('movie/12asd345.mp4'),
('movie/12323445.mp4'),
('movie/123765445.mp4'),
('movie/12fds345.mp4'),
('movie/12ccc345.mp4');

INSERT INTO show_genre(genre_id, vid_id)
VALUES
(5, 1),
(6, 1),
(5, 2),
(7, 2),
(8, 2),
(3, 3),
(6, 3),
(5, 4),
(6, 4),
(8, 4),
(1, 5);


INSERT INTO member(first_name, last_name, email, gender, city, state, country)
VALUES
('Kayle', 'Boot', 'kbooty0@amazon.com', 'Female', 'Point Pedro', ' ', 'Sri Lanka'),
('Sawyere',	'Lealle', 'slealle1@addthis.com', 'Male', 'San Isidro', ' ', 'Philippines'),
('Darb', 'Hearst', 'dhearst2@biglobe.ne.jp', 'Female', 'Dorp Antriol', ' ', 'Bonaire, Saint Eustatius and Saba'),
('Maison', 'Perin', 'mperin3@wikimedia.org', 'Male', 'La Chapelle-sur-Erdre', 'B5', 'France'),
('Raimundo', 'Cohani', 'rcohani4@bluehost.com', 'Male', 'Lipiany', ' ', 'Poland'),
('Virgil', 'Keller', 'vkeller5@blinklist.com', 'Male', 'Saint-Flour', '98', 'France'),
('Olin', 'Richardeau', 'orichardeau6@google.cn', 'Male', 'Salamanca', 'CL', 'Spain'),
('Denyse', 'Humphery', 'dhumphery7@dagondesign.com', 'Female', 'Gorna Oryakhovitsa', ' ', 'Bulgaria'),
('Cherym', 'Barme', 'cbarme8@narod.ru', 'Female', 'Huangtian', ' ', 'China'),
('Brita', 'Saberton', 'bsaberton9@istockphoto.com', 'Female', 'Mago??la', ' ', 'Greece'),
('Irma', 'Shankster', 'ishankstera@newsvine.com', 'Female', 'Bulnes', ' ', 'Chile'),
('Rosamund', 'Caen', 'rcaenb@com.com', 'Female', 'Itamb??', ' ', 'Brazil'),
('Aylmar', 'Banks', 'abanksc@smugmug.com', 'Male', 'Quevedo', ' ','Ecuador'),
('Neely', 'Earey', 'neareyd@timesonline.co.uk', 'Female', 'Remscheid', 'NW', 'Germany'),
('Revkah', 'Blinman', 'rblinmane@surveymonkey.com', 'Female', 'Usevia', ' ', 'Tanzania'),
('Mayne', 'Bednall', 'mbednallf@apache.org', 'Male', 'Pesochnoye', ' ','Russia'),
('Ora', 'Yewman', 'oyewmang@so-net.ne.jp', 'Female', 'Staryy Saltiv', ' ','Ukraine'),
('Bogart', 'Crottagh', 'bcrottaghh@sakura.ne.jp', 'Male', 'Austin', 'TX', 'United States'),
('Sebastiano', 'Saice', 'ssaicei@google.com.br', 'Male', 'Sundsvall', 'Y', 'Sweden'),
('Sam', 'Pearson', 'spearsonj@ow.ly', 'Male', 'Qinlan', ' ','China');

INSERT INTO viewHistory(view_date, member_id, video_id)
VALUES
(6/15/2018, 5, 7),
(8/10/2019, 16, 7),
(5/13/2017, 20, 5),
(6/27/2019, 9, 3),
(3/5/2021, 8, 1),
(1/7/2022, 2, 7),
(8/24/2017, 13, 7),
(2/19/2016, 13, 4),
(7/21/2017, 8, 6),
(12/30/2016, 14, 7),
(11/6/2016, 20, 5),
(4/22/2018, 7, 4),
(10/4/2018, 4, 8),
(10/2/2020, 3, 3),
(6/15/2019, 5, 6),
(9/1/2020, 2, 1),
(1/7/2018, 6, 3),
(11/14/2015, 5, 7),
(1/24/2016, 15, 3),
(1/4/2018, 3, 3);