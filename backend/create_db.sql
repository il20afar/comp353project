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
	asso_id INT,
	PRIMARY KEY (user_id)
);

CREATE TABLE associations (
	asso_id INT NOT NULL AUTO_INCREMENT,
	asso_name VARCHAR(50) NOT NULL UNIQUE,
	asso_desc VARCHAR(1000) NOT NULL,
	admin_id INT NOT NULL,
	PRIMARY KEY (asso_id),
	FOREIGN KEY (admin_id) REFERENCES users(user_id)
);

ALTER TABLE
	users
ADD
	FOREIGN KEY (asso_id) REFERENCES associations(asso_id);

CREATE TABLE condos (
	condo_id INT NOT NULL AUTO_INCREMENT,
	price INT NOT NULL,
	area INT NOT NULL,
	condo_number VARCHAR(50) NOT NULL,
	street VARCHAR(50) NOT NULL,
	city VARCHAR(50) NOT NULL,
	province VARCHAR(50) NOT NULL,
	country VARCHAR(50) NOT NULL,
	features VARCHAR(1000) NOT NULL,
	PRIMARY KEY (condo_id),
	UNIQUE (street, city, province, country)
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

CREATE TABLE polls (
	poll_id INT NOT NULL AUTO_INCREMENT,
	question VARCHAR(200) NOT NULL UNIQUE,
	number_of_votes INT NOT NULL DEFAULT 0,
	poll_status VARCHAR(50) NOT NULL DEFAULT "open",
	asso_id INT NOT NULL,
	PRIMARY KEY (poll_id),
	FOREIGN KEY (asso_id) REFERENCES associations(asso_id)
);

CREATE TABLE answers (
	answer_id INT NOT NULL AUTO_INCREMENT,
	content VARCHAR(200) NOT NULL,
	number_of_votes INT NOT NULL DEFAULT 0,
	poll_id INT NOT NULL,
	PRIMARY KEY (answer_id),
	FOREIGN KEY (poll_id) REFERENCES polls(poll_id),
	UNIQUE (answer_id, content)
);

CREATE TABLE votes (
	user_id INT NOT NULL,
	poll_id INT NOT NULL,
	answer_id INT NOT NULL,
	PRIMARY KEY (user_id, poll_id, answer_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (poll_id) REFERENCES polls(poll_id),
	FOREIGN KEY (answer_id) REFERENCES answers(answer_id)
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

UPDATE
	users
SET
	asso_id = 1;

INSERT INTO
	condos (
		price,
		area,
		condo_number,
		street,
		city,
		province,
		country,
		features
	)
VALUES
	(
		8500000,
		3000,
		'PH1230',
		'1280 Sherbrooke Street West',
		'Montreal',
		'Quebec',
		'Canada',
		'All kitchen appliances, washer-dryer, all motorized blinds, all garage remotes, all curtains and rods, custom-built shelves in the upper level den, retractable exterior awnings, staircase chandelier, living room fireplace mantel, home automation system "Creston".'
	),
	(
		6900000,
		2700,
		'4801',
		'1050 Drummond Street',
		'Montreal',
		'Quebec',
		'Canada',
		'All the kitchen appliances (Wolf & Sub-Zero & Monogram), Washer/Dryer (Maytag), All the motorized blinds, All the built-in speakers, All the built-in''s, All the Lutron lighting control system.'
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
		'Classified Condo Ad #1',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'1',
		'http://localhost:3001/backend/condo_pictures/e.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		3
	),
	(
		'Classified Condo Ad #2',
		'condo',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'1',
		'http://localhost:3001/backend/condo_pictures/f.jpeg, http://localhost:3001/backend/condo_pictures/building.jpeg',
		4
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
		'Classified Item Sale Ad #1',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'1',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		3
	),
	(
		'Classified Item Sale Ad #2',
		'item_sale',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'1',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		4
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
		'Classified Service Ad #1',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'1',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		3
	),
	(
		'Classified Service Ad #2',
		'service',
		'The illusion which exalts us is dearer to us than ten thousand truths.',
		4500,
		'Montreal',
		'1',
		'http://localhost:3001/backend/condo_pictures/a.jpeg, /path/to/other/picture',
		4
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

INSERT INTO
	polls (question, asso_id)
VALUES
	('When should we hold the next elections?', 1),
	(
		'Are you satisfied with the way our association is currently managed?',
		1
	),
	('How many properties do you currently own?', 1),
	(
		'Do you think real estate in Montreal is in a good spot?',
		1
	);

INSERT INTO
	answers (content, poll_id)
VALUES
	('Next month', 1),
	('In march', 1),
	('Yes', 2),
	('No', 2),
	('Mixed feelings', 2),
	('Less than 3', 3),
	('Between 4 and 8', 3),
	('More than 8', 3),
	('Yes', 4),
	('No', 4);

UPDATE
	polls
SET
	number_of_votes = 4
WHERE
	poll_id = 1;

UPDATE
	polls
SET
	number_of_votes = 3
WHERE
	poll_id = 2;

UPDATE
	answers
SET
	number_of_votes = 2
WHERE
	answer_id = 1;

UPDATE
	answers
SET
	number_of_votes = 2
WHERE
	answer_id = 2;

UPDATE
	answers
SET
	number_of_votes = 2
WHERE
	answer_id = 3;

UPDATE
	answers
SET
	number_of_votes = 1
WHERE
	answer_id = 4;

UPDATE
	answers
SET
	number_of_votes = 0
WHERE
	answer_id = 5;

INSERT INTO
	votes (user_id, poll_id, answer_id)
VALUES
	(1, 1, 1),
	(2, 1, 1),
	(3, 1, 2),
	(4, 1, 2),
	(1, 2, 3),
	(2, 2, 3),
	(3, 2, 4);