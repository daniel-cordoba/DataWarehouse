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

CREATE TABLE `companies` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`address` VARCHAR(100) NOT NULL DEFAULT '0',
	`email` VARCHAR(50) NOT NULL DEFAULT '0',
	`phone` VARCHAR(50) NOT NULL DEFAULT '0',
	`city` VARCHAR(50) NOT NULL DEFAULT '0',
	`city_id` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`ID`),
	CONSTRAINT `FK_companies_cities` FOREIGN KEY (`city_id`) REFERENCES `cities` (`ID`)
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `companies` (`name`, `address`, `email`, `phone`, `city`, `city_id`)
VALUES ('Softtek', 'xxxxxx', 'softtek@soft.com', '3508060201', 'Tijuana', 10),
('Globant', 'xxxxxx', 'globant@globant.com', '3408060201', 'Buenos Aires', 1),
('Rappi', 'xxxxxx', 'rappi@rappi.com', '3308060201', 'Medellín', 5),
('MercadoLibre', 'xxxxxx', 'mercadolibre@mercadolibre.com', '3208060201', 'Córdoba', 2);

CREATE TABLE `contacts` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`last_name` VARCHAR(50) NOT NULL DEFAULT '0',
	`charge` VARCHAR(50) NOT NULL DEFAULT '0',
	`email` VARCHAR(50) NOT NULL DEFAULT '0',
	`company` VARCHAR(50) NOT NULL DEFAULT '0',
	`region` VARCHAR(50) NULL DEFAULT '0',
	`country` VARCHAR(50) NULL DEFAULT '0',
	`city` VARCHAR(50) NULL DEFAULT '0',
	`interest` VARCHAR(50) NULL DEFAULT '0',
	PRIMARY KEY (`ID`)
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `contacts` (`name`, `last_name`, `charge`, `email`, `company`, `region`, `country`, `city`, `interest`) 
VALUES ('Camila', 'Soledad Pantó', 'UX Designer', 'camilapanto123@gmail.com', 'Softtek', 'Norteamerica', 'México', 'Tijuana', '50%'),
('Agustín Emanuel', 'Soria', 'UI Designer', 'agustinesoria96@gmail.com', 'Globant', 'Sudamerica', 'Argentina', 'Buenos Aires', '100%'),
('Denver Steven', 'Soria', 'Developer', 'denver-steven@gmail.com', 'Rappi', 'Sudamerica', 'Colombia', 'Medellín', '25%'),
('Sebastian Agustín', 'Pantó', 'Product', 'sebapanto@gmail.com', 'MercadoLibre', 'Sudamerica', 'Argentina', 'Córdoba', '25%'),
('Stefanía Natalí', 'Soria', 'UI Designer', 'agustinesoria96@gmail.com', 'Softtek', 'Norteamerica', 'México', 'Ciudad de México', '50%')
;





