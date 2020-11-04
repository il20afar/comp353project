DROP DATABASE IF EXISTS comp353;

CREATE DATABASE comp353;

USE comp353;

CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
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
	asso__name VARCHAR(50) NOT NULL,
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
	FOREIGN KEY(asso_id) REFERENCES associations(asso_id)
);

CREATE TABLE ads (
	ad_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	ad_type VARCHAR(50) NOT NULL,
	ad_desc VARCHAR(1000) NOT NULL,
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