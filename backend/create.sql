CREATE DATABASE `data_warehouse`;
USE `data_warehouse`;

CREATE TABLE `users` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`last_name` VARCHAR(50) NOT NULL DEFAULT '0',
	`email` VARCHAR(100) NOT NULL DEFAULT '0',
	`profile` VARCHAR(15) NOT NULL DEFAULT '0',
	`password` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `users` (`name`, `last_name`, `email`, `profile`, `password`) 
VALUES ('admin', 'admin', 'admin@admin.com', 'administrador', 'admin123'),
('contact', 'contact', 'contact@contact.com', 'contactos', 'contact123');

CREATE TABLE `regions` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '',
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `regions` (`name`)
VALUES ('Sudamerica'), ('Norteamerica');

CREATE TABLE `countries` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`region_id` INT NOT NULL DEFAULT '0',
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`ID`),
	CONSTRAINT `FK_countries_regions` FOREIGN KEY (`region_id`) REFERENCES `regions` (`ID`)
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `countries` (`region_id`,`name`)
VALUES (1, 'Argentina'), (1, 'Colombia'), (1, 'Chile'),
(2, 'Mexico'), (2, 'Estados Unidos');

CREATE TABLE `cities` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`country_id` INT NOT NULL DEFAULT '0',
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`ID`),
	CONSTRAINT `FK_cities_countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`ID`)
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `cities` (`country_id`, `name`)
VALUES (1, 'Buenos Aires'), (1, 'Córdoba'),
(2, 'Bogotá'), (2, 'Cúcuta'), (2, 'Medellín'),
(3, 'Atacama'), (3, 'Santiago'), (3, 'Valparaíso'),
(4, 'Ciudad de México'), (4, 'Tijuana'),
(5, 'Florida'), (5, 'Texas');








