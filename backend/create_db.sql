DROP DATABASE IF EXISTS comp353;
CREATE DATABASE comp353;
USE comp353;

CREATE TABLE user (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	password varchar(255) NOT NULL,
	firstname varchar(100) NOT NULL,
	lastname varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	phoneno bigint NOT NULL,
	address varchar(50) NOT NULL,
	city varchar(50) NOT NULL,
	province varchar(50) NOT NULL,
	country varchar(50) NOT NULL,
	profilepicture varchar(1000),
	PRIMARY KEY (ID)
);

INSERT INTO user (
	username,
    password,
    firstname,
    lastname,
    email,
    phoneno,
    address,
    city,
    province,
    country,
    profilepicture
) 
VALUES 
	('afar', 'afar', 'Antoine', 'Farley', 'afar@hey.you', '7776665555', '10 Main Street', 'Montreal', 'Quebec', 'Canada', ''), 
	('rohh', 'rohh', 'Rohhann', 'Thambithurai', 'rt@hey.you', '0009998888', '14 Main Street', 'Montreal', 'Quebec', 'Canada', ''), 
	('poon', 'poon', 'Brian', 'Poon', 'bp@hey.you', '8447776666', '18 Main Street', 'Hong Kong', 'Hong Kong', 'Hong Kong', ''),
	('mpob', 'mpob', 'Maxime', 'Pobudzey', 'mpob@hey.you', '6665576532', '45 President Street', 'Ottawa', 'Ontario', 'Canada', ''); 

