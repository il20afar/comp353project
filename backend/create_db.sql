CREATE DATABASE IF NOT EXISTS comp353;
USE comp353;
CREATE TABLE User (
	ID int NOT NULL AUTO_INCREMENT,
	Username varchar(50) NOT NULL,
	Password varchar(50) NOT NULL,
	PRIMARY KEY (ID)
);
INSERT INTO User (Username, Password) VALUES ('Admin', 'Admin'), ('Maxim', 'Maxim'), ('Antoine', 'Antoine'), ('Rohhaan', 'Rohhaan'), ('Brian', 'Brian');