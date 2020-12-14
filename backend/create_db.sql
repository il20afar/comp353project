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
	title VARCHAR(200) NOT NULL,
	ad_type VARCHAR(100) NOT NULL,
	ad_desc VARCHAR(1000) NOT NULL,
	ad_price INT NOT NULL,
	ad_city VARCHAR(50) NOT NULL,
	visibility VARCHAR(100) NOT NULL,
	pictures VARCHAR(1000),
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

CREATE TABLE messages (
	message_id INT NOT NULL AUTO_INCREMENT,
	message_subject VARCHAR(50),
	content VARCHAR(5000),
	creation_time DATETIME NOT NULL DEFAULT NOW(),
	read_status VARCHAR(50) NOT NULL DEFAULT "unread",
	attachments VARCHAR(500),
	author_id INT NOT NULL,
	recipient_id INT NOT NULL,
	PRIMARY KEY (message_id),
	FOREIGN KEY (author_id) REFERENCES users(user_id),
	FOREIGN KEY (recipient_id) REFERENCES users(user_id)
);

CREATE TABLE activities (
	activity_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL UNIQUE,
	activity_desc VARCHAR(1000) NOT NULL,
	starting_time DATETIME NOT NULL,
	ending_time DATETIME NOT NULL,
	number_of_attendees INT NOT NULL DEFAULT 0,
	creator_id INT NOT NULL,
	asso_id INT NOT NULL,
	PRIMARY KEY (activity_id),
	FOREIGN KEY (creator_id) REFERENCES users(user_id),
	FOREIGN KEY (asso_id) REFERENCES associations(asso_id)
);

CREATE TABLE attends (
	user_id INT NOT NULL,
	activity_id INT NOT NULL,
	PRIMARY KEY (user_id, activity_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (activity_id) REFERENCES activities(activity_id)
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
		'afar@conman.com',
		5149635321,
		'http://localhost:80/comp353project/backend/pictures/users/default-user-picture.jpeg'
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
		'rohh@conman.com',
		5149548888,
		'http://localhost:80/comp353project/backend/pictures/users/default-user-picture.jpeg'
	),
	(
		'poon',
		'poon',
		'Brian',
		'Poon',
		'18 Main Street',
		'Montreal',
		'Quebec',
		'Canada',
		'poon@conman.com',
		5149766539,
		'http://localhost:80/comp353project/backend/pictures/users/default-user-picture.jpeg'
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
		'mpob@conman.com',
		6135576532,
		'http://localhost:80/comp353project/backend/pictures/users/default-user-picture.jpeg'
	),
	(
		'admin',
		'admin',
		'Vitalik',
		'Buterin',
		'25 Montgomery Avenue',
		'Toronto',
		'Ontario',
		'Canada',
		'admin@conman.com',
		4379765687,
		'http://localhost:80/comp353project/backend/pictures/users/default-user-picture.jpeg'
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
	asso_id = 1
WHERE
	NOT user_id = 5;

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
		'Perfect 2 Bedroom Condo, Located in Downtown, Montreal - 6mins from Guy Metro!',
		'condo',
		'2 Beds/2 Baths - 850sqt - Furniture all included - Smart Home Included - Free Indoor Parking - Various condo amenities',
		500000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/a.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		1
	),
	(
		'Modern Clean Condo, 1 Bedroom Condo, DOWNTOWN, Near Concordia University!',
		'condo',
		'1 Bed/1 Bath - 700sqt - Master bedroom Balcony - Furniture all included - Free Indoor Parking - Various condo amenities',
		320000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/b.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		2
	),
	(
		'2 Beds, 2 Baths Apartment/Condo, Recently Renovated',
		'condo',
		'2 Beds/2 Baths - 720sqt - Recently Renovated - Smart Home Included - Free Indoor Parking - Various condo amenities',
		450000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/c.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		3
	),
	(
		'Gorgeous 1 Bedroom Condo (+ BALCONY), 650sqt, At the heart of Montreal, Downtown!',
		'condo',
		'1 Bed/1 Bath - 650sqt - Furniture all included - Balcony - Free Indoor Parking - Various condo amenities',
		390000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/d.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		4
	),
	(
		'CONDO FOR SALE! 2 Beds, 1 Bath, Very Modern, LOCATED IN DOWNTOWN, MONTREAL!',
		'condo',
		'2 Beds/1 Bath - 800sqt - Recently Renovated - Free Indoor Parking - Various condo amenities',
		550000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/e.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		1
	),
	(
		'Beautiful Penthouse Condo for SALE, 800sqt, Located near BUS/METRO',
		'condo',
		'2 Beds/1 Bath - 900sqt - Penthouse Suite - Smart Home Included - Furniture all included - Free Indoor Parking - Various condo amenities',
		700000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/f.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		2
	),
	(
		'Luxurious Penthouse Suite for SALE, 2 Bedrooms, FOR SALE',
		'condo',
		'2 Beds/2 Baths - 760sqt - Floor Recently Renovated - Smart Home Included - Furniture all included - Free Indoor Parking - Various condo amenities',
		450000,
		'Montreal',
		'1',
		'http://localhost:80/comp353project/backend/pictures/ads/e.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		3
	),
	(
		'3 Bedroom Condo FOR SALE, Recently Renovated, NEAR CONCORDIA UNIVERSITY',
		'condo',
		'3 Beds/2 Baths - 810sf - Smart Home Included - Free Indoor Parking - Various condo amenities',
		4500,
		'Montreal',
		'1',
		'http://localhost:80/comp353project/backend/pictures/ads/f.jpeg, http://localhost:80/comp353project/backend/pictures/ads/building.jpeg',
		4
	),
	(
		'8K OLED TV',
		'item_sale',
		'Immerse yourself in entertainment with the Sony BRAVIA OLED 65" 4K HDR TV. With technologies including OLED, X-Motion Clarity, Picture Processor X1 Ultimate, TRILUMINOS Display, and more, it produces vibrant, dynamic visuals. Access loads of movies, shows, and apps with Android TV, and control your smart home and more with your voice via Google Assistant.',
		4500,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/tv.jpeg',
		1
	),
	(
		'Brand New Oven',
		'item_sale',
		'Create many more or much larger dishes with a huge 3.1 cu. ft. capacity oven. It opens up more possibilities in home cooking. You can prepare multiple dishes at once, like vegetables, pastries or casseroles. Or easily cook large items, like a big roast or holiday turkey with all the trimmings.',
		2000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/oven.jpeg',
		2
	),
	(
		'Altia Couch (GREAT PRICE)',
		'item_sale',
		'Altia classic design is derived from a sophisticated form of soft lines and a just-right low profile. The compact size of the original sofa is ideal for smaller spaces, while custom configurations of the sectional can be a perfect fit for any living room. The low backrest matched with high feather filled removable cushions creates an elegantly stylish aesthetic. Design your own sofa with your favorite upholstery. The base is also available in an assortment of colors and finishes for a truly unique look.',
		6000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/couch.jpeg',
		1
	),
	(
		'Playstation 5 (Brand New)',
		'item_sale',
		'Discover new gaming possibilities that will surpass your wildest dreams with the PlayStation 5 Digital Edition console. Enjoy super-fast load times on the PS5 with an ultra-high-speed solid-state drive, a deeper immersive experience with haptic feedback, adaptive triggers, 3D audio technology, 4K and 8K output, and a whole new generation of amazing PlayStation games.',
		1000,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/ps5.jpeg',
		2
	),
	(
		'Dyson Vacuum',
		'item_sale',
		'The Dyson Cyclone V10 Motorhead Cordless Stick Vacuum offers the same suction as a corded vacuum. Get rid of dirt, dust, pet hair and more with the ease and convenience of a lightweight vacuum cleaner. The Cyclone V10 Motorhead traps everything from fine dust to large debris. Includes 3 accessories.',
		400,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/dyson.jpeg',
		2
	),
	(
		'Standing Office Desk (LIKE NEW)',
		'item_sale',
		'Standing office desk w/ remote. Originally from IKEA, used for less than a year. No observable damages.',
		200,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/desk.jpeg',
		3
	),
	(
		'27 inch 4k Curved Monitor',
		'item_sale',
		'Live the 4k Experience with this monitor from Samsung. Option to be mountable available. Contact for more details.',
		390,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/monitor.jpeg',
		4
	),
	(
		'Plumber',
		'service',
		'Famous plumber seen from TV advertisements can be the one fixing your condo plumbing! Call Rohhaan for his services and get 10% OFF any condo amenity!',
		100,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/plumber.jpeg',
		1
	),
	(
		'Technician',
		'service',
		'Hire me for any issues regarding wiring, stud finding, network issues, & more!',
		60,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/technician.jpeg',
		2
	),
	(
		'CON Food Delivery',
		'service',
		'Order food from select restaurants using our very own staff.',
		150,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/food.jpeg',
		3
	),
	(
		'Personal Trainer',
		'service',
		'Hire your very own personal trainer to get fit and live the fit life. Contact for more info.',
		100,
		'Montreal',
		'public',
		'http://localhost:80/comp353project/backend/pictures/ads/trainer.jpeg',
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
	),
	('Should we change our associations name?', 1);

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
	('No', 4),
	('Yes. I don''t like the current name', 5),
	('No. The current name is fine.', 5);

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
	polls
SET
	number_of_votes = 4
WHERE
	poll_id = 5;

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

UPDATE
	answers
SET
	number_of_votes = 3
WHERE
	answer_id = 11;

UPDATE
	answers
SET
	number_of_votes = 1
WHERE
	answer_id = 12;

INSERT INTO
	votes (user_id, poll_id, answer_id)
VALUES
	(1, 1, 1),
	(2, 1, 1),
	(3, 1, 2),
	(4, 1, 2),
	(1, 2, 3),
	(2, 2, 3),
	(3, 2, 4),
	(1, 5, 11),
	(2, 5, 11),
	(3, 5, 11),
	(4, 5, 12);

UPDATE
	polls
SET
	poll_status = 'closed'
WHERE
	poll_id = 5;

INSERT INTO
	messages (
		message_subject,
		content,
		author_id,
		recipient_id
	)
VALUES
	(
		'Welcome to Condo Owners Association of Concordia!',
		'Hello Maxim, I just wanted to give you a warm welcome to our association. Feel free to reach out to me with any questions you might have! Antoine.',
		1,
		4
	),
	(
		'Fellow Concordian',
		'Hey Maxim, It''s always a pleasure to connect with Concordia graduates. What did you major in? If not for this pandemic, we would''ve had a proper introduction! Rohhaan.',
		2,
		4
	);

INSERT INTO
	activities (
		title,
		activity_desc,
		starting_time,
		ending_time,
		creator_id,
		asso_id
	)
VALUES
	(
		'5@7 at Bier Markt',
		'Hey everyone, I''ve decided to host this small event to welcome any newcomers to our association. The address of the restaurant is 1221 Rene-Levesque West Boulevard. Please confirm if you can make it and shoot me a message if you have any other suggestions! Thanks, Rohhaan.',
		'2020-12-20 17:00:00',
		'2020-12-20 19:00:00',
		2,
		1
	),
	(
		'Wine & Cheese',
		'Hello, I would like to organize a Wine & Cheese event with some representatives from another condo association. This would be an amazing opportunity to network. Thoughts?',
		'2021-01-15 17:30:00',
		'2021-01-15 19:30:00',
		4,
		1
	),
	(
		'Impact of COVID-19 on Real Estate',
		'Don''t miss out on this amazing presentation by world famous economist Dr. Keynes! Held in Concordia''s EV building.',
		'2021-02-22 14:30:00',
		'2021-02-22 16:30:00',
		4,
		1
	);

INSERT INTO
	attends (user_id, activity_id)
VALUES
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 2),
	(4, 3),
	(3, 3);

UPDATE
	activities
SET
	number_of_attendees = 3
WHERE
	activity_id = 1;

UPDATE
	activities
SET
	number_of_attendees = 1
WHERE
	activity_id = 2;

UPDATE
	activities
SET
	number_of_attendees = 2
WHERE
	activity_id = 3;