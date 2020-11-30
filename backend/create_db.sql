DROP DATABASE IF EXISTS comp353;

CREATE DATABASE comp353;

USE comp353;

/* Creating tables */
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL UNIQUE,
	pw VARCHAR(255) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	street VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	province VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	phone_number BIGINT NOT NULL,
	profile_picture VARCHAR(1000) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE associations (
	asso_id INT NOT NULL AUTO_INCREMENT,
	asso_name VARCHAR(50) NOT NULL UNIQUE,
	asso_desc VARCHAR(1000) NOT NULL,
	admin_id INT NOT NULL,
	PRIMARY KEY(asso_id),
	FOREIGN KEY(admin_id) REFERENCES users(user_id)
);

CREATE TABLE condos (
	condo_id INT NOT NULL AUTO_INCREMENT,
	price INT NOT NULL,
	area INT NOT NULL,
	street VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	province VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
	features VARCHAR(1000) NOT NULL,
	asso_id INT,
	PRIMARY KEY(condo_id),
	FOREIGN KEY(asso_id) REFERENCES associations(asso_id),
	UNIQUE(street, city, province, country)
);

CREATE TABLE ads (
	ad_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	ad_type VARCHAR(50) NOT NULL,
	ad_desc VARCHAR(1000) NOT NULL,
	ad_price INT NOT NULL,
	ad_city VARCHAR(50) NOT NULL,
	visibility VARCHAR(50) NOT NULL,
	pictures VARCHAR(1000) NOT NULL,
	creator_id INT NOT NULL,
	PRIMARY KEY (ad_id),
	FOREIGN KEY (creator_id) REFERENCES users(user_id)
);

CREATE TABLE owns (
	user_id INT NOT NULL,
	condo_id INT NOT NULL,
	percent INT NOT NULL,
	PRIMARY KEY (user_id, condo_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (condo_id) REFERENCES condos(condo_id)
);

CREATE TABLE threads (
	thread_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL UNIQUE,
	creation_time DATETIME NOT NULL DEFAULT NOW(),
	last_update_time DATETIME NOT NULL DEFAULT NOW(),
	number_of_replies INT NOT NULL DEFAULT 0,
	creator_username VARCHAR(50) NOT NULL,
	creator_id INT NOT NULL,
	PRIMARY KEY (thread_id),
	FOREIGN KEY (creator_id) REFERENCES users(user_id)
);

CREATE TABLE replies (
	reply_id INT NOT NULL AUTO_INCREMENT,
	content VARCHAR(500) NOT NULL,
	creation_time DATETIME NOT NULL DEFAULT NOW(),
	author_id INT NOT NULL,
	thread_id INT NOT NULL,
	PRIMARY KEY (reply_id),
	FOREIGN KEY (author_id) REFERENCES users(user_id),
	FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
);

/* Inserting data */
INSERT INTO
	users (
		username,
		pw,
		first_name,
		last_name,
		street,
		city,
		province,
		country,
		email,
		phone_number,
		profile_picture
	)
VALUES
	(
		'afar',
		'afar',
		'Antoine',
		'Farley',
		'10 Main Street',
		'Montreal',
		'Quebec',
		'Canada',
		'afar@hey.you',
		7776665555,
		'/some/path/'
	),
	(
		'rohh',
		'rohh',
		'Rohhann',
		'Thambithurai',
		'14 Main Street',
		'Montreal',
		'Quebec',
		'Canada',
		'rohh@hey.you',
		0009998888,
		'/some/path/'
	),
	(
		'poon',
		'poon',
		'Brian',
		'Poon',
		'18 Main Street',
		'Toronto',
		'Ontario',
		'Canada',
		'poon@hey.you',
		8447776666,
		'/some/path/'
	),
	(
		'mpob',
		'mpob',
		'Maxim',
		'Pobudzey',
		'45 President Street',
		'Ottawa',
		'Ontario',
		'Canada',
		'mpob@hey.you',
		6665576532,
		'/some/path/'
	);

INSERT INTO
	associations (asso_name, asso_desc, admin_id)
VALUES
	(
		'Condo Owners Association of Concordia',
		'An association dedicated to bringing together condo owners of Concordia University.',
		1
	);

INSERT INTO
	condos (
		price,
		area,
		street,
		city,
		province,
		country,
		features,
		asso_id
	)
VALUES
	(
		500000,
		3000,
		'15 Some Street',
		'Montreal',
		'Quebec',
		'Canada',
		'Gas fireplace, AC system',
		1
	),
	(
		700000,
		3500,
		'20 Some Street',
		'Montreal',
		'Quebec',
		'Canada',
		'Granite kitchen countertop, Close to subway',
		1
	);

INSERT INTO
	owns (user_id, condo_id, percent)
VALUES
	(1, 1, 50),
	(2, 1, 50),
	(3, 2, 40),
	(4, 2, 60);

INSERT INTO
	ads (
		title,
		ad_type,
		ad_desc,
		ad_price,
		ad_city,
		visibility,
		pictures,
		creator_id
	)
VALUES
	(
		'Public Condo Ad #1',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'public',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		1
	),
	(
		'Public Condo Ad #2',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'public',
		'http://localhost:3001/backend/condo_pictures/b.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		2
	),
	(
		'General Condo Ad #1',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'general',
		'http://localhost:3001/backend/condo_pictures/c.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		3
	),
	(
		'General Condo Ad #2',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'general',
		'http://localhost:3001/backend/condo_pictures/d.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		4
	),
	(
		'Classified Condo Ad #1',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'Condo Owners Association of Concordia',
		'http://localhost:3001/backend/condo_pictures/e.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		1
	),
	(
		'Classified Condo Ad #2',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'Condo Owners Association of Concordia',
		'http://localhost:3001/backend/condo_pictures/f.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		2
	),
	(
		'Public Item Sale Ad #1',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'public',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		1
	),
	(
		'Public Item Sale Ad #2',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'public',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		2
	),
	(
		'General Item Sale Ad #1',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'general',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		3
	),
	(
		'General Item Sale Ad #2',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'general',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		4
	),
	(
		'Classified Item Sale Ad #1',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'Condo Owners Association of Concordia',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		1
	),
	(
		'Classified Item Sale Ad #2',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'Condo Owners Association of Concordia',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		2
	),
	(
		'Public Service Ad #1',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'public',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		1
	),
	(
		'Public Service Ad #2',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'public',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		2
	),
	(
		'General Service Ad #1',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'general',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		3
	),
	(
		'General Service Ad #2',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'general',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		4
	),
	(
		'Classified Service Ad #1',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'Condo Owners Association of Concordia',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		1
	),
	(
		'Classified Service Ad #2',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'Condo Owners Association of Concordia',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		2
	);

INSERT INTO
	threads (title, creator_username, creator_id)
VALUES
	(
		'Suggestions for a Montreal Newcomer?',
		'mpob',
		4
	),
	('Nice Area for Students', 'afar', 1);

INSERT INTO
	replies (content, author_id, thread_id)
VALUES
	(
		'What exactly are you looking for?',
		2,
		1
	),
	(
		'Please elaborate and we''ll gladly help!',
		3,
		1
	),
	(
		'I would suggest either Cote-des-Neiges or anywhere near Concordia University.',
		4,
		2
	),
	('What''s your budget?', 3, 2);

/* Byproduct of creating replies */
UPDATE
	threads
SET
	number_of_replies = 2;

UPDATE
	threads
SET
	last_update_time = NOW();