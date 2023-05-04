CREATE DATABASE bikes;

USE bikes;

DROP TABLE IF EXISTS bicicleta;

CREATE TABLE `bicicleta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) ,
  `color` varchar(255),
  `ubicacion` varchar(255),
  `estado` varchar(255),
  PRIMARY KEY (`id`)
);