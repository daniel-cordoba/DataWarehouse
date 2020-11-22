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
	`region_id` INT NULL DEFAULT NULL,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`ID`),
	CONSTRAINT `FK_countries_regions` FOREIGN KEY (`region_id`) REFERENCES `regions` (`ID`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `countries` (`region_id`,`name`)
VALUES (1, 'Argentina'), (1, 'Colombia'), (1, 'Chile'), (1, 'Uruguay'),
(2, 'Mexico'), (2, 'Estados Unidos');

CREATE TABLE `cities` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`country_id` INT NULL DEFAULT NULL,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`ID`),
	CONSTRAINT `FK_cities_countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`ID`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `cities` (`country_id`, `name`)
VALUES (1, 'Buenos Aires'), (1, 'Córdoba'),
(2, 'Bogotá'), (2, 'Cúcuta'), (2, 'Medellín'),
(3, 'Atacama'), (3, 'Santiago'), (3, 'Valparaíso'),
(4, 'Canelones'), (4, 'Maldonado'), (4, 'Montevideo'),
(5, 'Ciudad de México'), (5, 'Tijuana'),
(6, 'Florida'), (6, 'Texas');

CREATE TABLE `companies` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0',
	`adress` VARCHAR(100) NOT NULL DEFAULT '0',
	`email` VARCHAR(50) NOT NULL DEFAULT '0',
	`phone` VARCHAR(50) NOT NULL DEFAULT '0',
	`city` VARCHAR(50) NOT NULL DEFAULT '0',
	`city_id` INT NULL DEFAULT NULL,
	PRIMARY KEY (`ID`),
	INDEX `FK_companies_cities` (`city_id`) USING BTREE,
	CONSTRAINT `FK_companies_cities` FOREIGN KEY (`city_id`) REFERENCES `data_warehouse`.`cities` (`ID`) ON UPDATE CASCADE ON DELETE SET NULL
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `companies` (`name`, `adress`, `email`, `phone`, `city`, `city_id`)
VALUES ('Softtek', 'xxxxxx', 'softtek@soft.com', '3508060201', 'Tijuana', 13),
('Globant', 'xxxxxx', 'globant@globant.com', '3408060201', 'Buenos Aires', 1),
('Rappi', 'xxxxxx', 'rappi@rappi.com', '3308060201', 'Medellín', 5),
('MercadoLibre', 'xxxxxx', 'mercadolibre@mercadolibre.com', '3208060201', 'Córdoba', 2);

CREATE TABLE `contacts` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`last_name` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`charge` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`company` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`company_id` INT(11) NULL DEFAULT NULL,
	`region` VARCHAR(50) NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`country` VARCHAR(50) NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`city` VARCHAR(50) NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`city_id` INT(11) NULL DEFAULT NULL,
	`interest` VARCHAR(50) NULL DEFAULT '0' COLLATE 'latin1_swedish_ci',
	`adress` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`ID`) USING BTREE,
	INDEX `FK_contacts_companies` (`company_id`) USING BTREE,
	INDEX `FK_contacts_cities` (`city_id`) USING BTREE,
	CONSTRAINT `FK_contacts_cities` FOREIGN KEY (`city_id`) REFERENCES `data_warehouse`.`cities` (`ID`) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT `FK_contacts_companies` FOREIGN KEY (`company_id`) REFERENCES `data_warehouse`.`companies` (`ID`) ON UPDATE CASCADE ON DELETE SET NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
INSERT INTO `contacts` (`name`, `last_name`, `charge`, `email`, `company`, `company_id`, `region`, `country`, `city`, `city_id`, `interest`) 
VALUES ('Camila', 'Soledad Pantó', 'UX Designer', 'camilapanto123@gmail.com', 'Softtek', 1, 'Norteamerica', 'México', 'Tijuana', 13, '50%'),
('Agustín Emanuel', 'Soria', 'UI Designer', 'agustinesoria96@gmail.com', 'Globant', 2, 'Sudamerica', 'Argentina', 'Buenos Aires', 1, '100%'),
('Denver Steven', 'Soria', 'Developer', 'denver-steven@gmail.com', 'Rappi', 3, 'Sudamerica', 'Colombia', 'Medellín', 5, '25%'),
('Sebastian Agustín', 'Pantó', 'Product', 'sebapanto@gmail.com', 'MercadoLibre', 4, 'Sudamerica', 'Argentina', 'Córdoba', 2, '25%'),
('Stefanía Natalí', 'Soria', 'UI Designer', 'stefana@gmail.com', 'Softtek', 1, 'Norteamerica', 'México', 'Ciudad de México', 12, '75%'),
('Milena Victoria', 'Soria', 'UX Designer', 'milesoria@gmail.com', 'MercadoLibre', 4, 'Sudamerica', 'Argentina', 'Córdoba', 2, '50%'),
('Valentino', 'Boetto', 'UI Designer', 'valenboetto@gmail.com', 'Globant', 2, 'Sudamerica', 'Argentina', 'Córdoba', 2, '100%'),
('Juan', 'Sbeghen', 'Developer', 'juan-sbg@gmail.com', 'Softtek', 1, 'Norteamerica', 'México', 'Ciudad de México', 12, '50%'),
('Guillermina', 'Budano', 'Product', 'guillebudano@gmail.com', 'Softtek', 1, 'Norteamerica', 'México', 'Tijuana', 13, '25%'),
('Laura', 'Errante', 'Sales', 'laurapastelera@gmail.com', 'Rappi', 3, 'Sudamerica', 'Colombia', 'Medellín', 5, '100%')
;

CREATE TABLE `channels` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`contact_id` INT NOT NULL,
	`channel` VARCHAR(50) NOT NULL DEFAULT '',
	`user` VARCHAR(50) NOT NULL DEFAULT '',
	`preference` VARCHAR(50) NOT NULL DEFAULT '',
	PRIMARY KEY (`ID`),
	INDEX `FK_channels_contacts` (`contact_id`) USING BTREE,
	CONSTRAINT `FK_channels_contacts` FOREIGN KEY (`contact_id`) REFERENCES `data_warehouse`.`contacts` (`ID`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
;
INSERT INTO `channels` (`contact_id`, `channel`, `user`, `preference`) 
VALUES ('1', 'Whatsapp', '3216485968', 'No molestar'),
('1', 'Facebook', 'CamiCa', 'Canal favorito'),
('1', 'Twitter', 'CamiCa', 'Sin preferencia'),
('2', 'Whatsapp', '', ''),
('2', 'Facebook', '', ''),
('2', 'Twitter', 'Agustintin', 'Sin preferencia'),
('3', 'Whatsapp', '3216488008', 'Sin preferencia'),
('3', 'Facebook', '@TechFb', 'No molestar'),
('3', 'Twitter', '@TechTw', 'Canal favorito'),
('4', 'Whatsapp', '3216486050', 'Sin preferencia'),
('4', 'Facebook', '', ''),
('4', 'Twitter', '', ''),
('5', 'Whatsapp', '3216586050', 'Sin preferencia'),
('5', 'Facebook', 'StefaLi', 'No molestar'),
('5', 'Twitter', 'Sttew', 'Canal favorito'),
('6', 'Whatsapp', '', 'Sin preferencia'),
('6', 'Facebook', 'Lomas', 'No molestar'),
('6', 'Twitter', 'LomasTT', 'Canal favorito'),
('7', 'Whatsapp', '3216586088', 'Canal favorito'),
('7', 'Facebook', 'Deko', 'No molestar'),
('7', 'Twitter', 'Deko', 'Sin preferencia'),
('8', 'Whatsapp', '', 'Sin preferencia'),
('8', 'Facebook', '', 'Sin preferencia'),
('8', 'Twitter', 'RedSoci', 'Canal favorito'),
('9', 'Whatsapp', '', 'Sin preferencia'),
('9', 'Facebook', '', 'Sin preferencia'),
('9', 'Twitter', '', 'Sin preferencia'),
('10', 'Whatsapp', '3146589292', 'Canal favorito'),
('10', 'Facebook', '', ''),
('10', 'Twitter', '', '')
;




