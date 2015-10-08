-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema halimber
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema halimber
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `halimber` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `halimber` ;

-- -----------------------------------------------------
-- Table `halimber`.`fb_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(85) NULL,
  `nombres` VARCHAR(75) NULL,
  `apellidos` VARCHAR(75) NULL,
  `telefono` VARCHAR(45) NULL,
  `estado` VARCHAR(255) NULL,
  `fb_id` VARCHAR(155) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_pagina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_pagina` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fb_usuario_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NULL,
  `fb_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ha_pagina_ha_usuario1_idx` (`fb_usuario_id` ASC),
  CONSTRAINT `fk_ha_pagina_ha_usuario1`
    FOREIGN KEY (`fb_usuario_id`)
    REFERENCES `halimber`.`fb_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_comentario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fb_usuario_id` INT NOT NULL,
  `fb_pagina_id` INT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `comentario` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ha_comentario_ha_usuario1_idx` (`fb_usuario_id` ASC),
  INDEX `fk_ha_comentario_ha_pagina1_idx` (`fb_pagina_id` ASC),
  CONSTRAINT `fk_ha_comentario_ha_usuario1`
    FOREIGN KEY (`fb_usuario_id`)
    REFERENCES `halimber`.`fb_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_comentario_ha_pagina1`
    FOREIGN KEY (`fb_pagina_id`)
    REFERENCES `halimber`.`fb_pagina` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_evento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fb_usuario_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `fechayhora` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ha_evento_ha_usuario1_idx` (`fb_usuario_id` ASC),
  CONSTRAINT `fk_ha_evento_ha_usuario1`
    FOREIGN KEY (`fb_usuario_id`)
    REFERENCES `halimber`.`fb_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`ha_marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`ha_marca` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `marca` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`ha_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`ha_categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `categoria` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`ha_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`ha_producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ha_marca_id` INT NOT NULL,
  `ha_categoria_id` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `producto` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ha_producto_ha_marca1_idx` (`ha_marca_id` ASC),
  INDEX `fk_ha_producto_ha_categoria1_idx` (`ha_categoria_id` ASC),
  CONSTRAINT `fk_ha_producto_ha_marca1`
    FOREIGN KEY (`ha_marca_id`)
    REFERENCES `halimber`.`ha_marca` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_producto_ha_categoria1`
    FOREIGN KEY (`ha_categoria_id`)
    REFERENCES `halimber`.`ha_categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`ha_keyworkd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`ha_keyworkd` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `keyword` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_comentario_has_ha_marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_comentario_has_ha_marca` (
  `fb_comentario_id` INT NOT NULL,
  `ha_marca_id` INT NOT NULL,
  PRIMARY KEY (`fb_comentario_id`, `ha_marca_id`),
  INDEX `fk_ha_comentario_has_ha_marca_ha_marca1_idx` (`ha_marca_id` ASC),
  INDEX `fk_ha_comentario_has_ha_marca_ha_comentario1_idx` (`fb_comentario_id` ASC),
  CONSTRAINT `fk_ha_comentario_has_ha_marca_ha_comentario1`
    FOREIGN KEY (`fb_comentario_id`)
    REFERENCES `halimber`.`fb_comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_comentario_has_ha_marca_ha_marca1`
    FOREIGN KEY (`ha_marca_id`)
    REFERENCES `halimber`.`ha_marca` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_comentario_has_ha_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_comentario_has_ha_producto` (
  `fb_comentario_id` INT NOT NULL,
  `ha_producto_id` INT NOT NULL,
  PRIMARY KEY (`fb_comentario_id`, `ha_producto_id`),
  INDEX `fk_ha_comentario_has_ha_producto_ha_producto1_idx` (`ha_producto_id` ASC),
  INDEX `fk_ha_comentario_has_ha_producto_ha_comentario1_idx` (`fb_comentario_id` ASC),
  CONSTRAINT `fk_ha_comentario_has_ha_producto_ha_comentario1`
    FOREIGN KEY (`fb_comentario_id`)
    REFERENCES `halimber`.`fb_comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_comentario_has_ha_producto_ha_producto1`
    FOREIGN KEY (`ha_producto_id`)
    REFERENCES `halimber`.`ha_producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_comentario_has_ha_keyworkd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_comentario_has_ha_keyworkd` (
  `fb_comentario_id` INT NOT NULL,
  `ha_keyworkd_id` INT NOT NULL,
  PRIMARY KEY (`fb_comentario_id`, `ha_keyworkd_id`),
  INDEX `fk_ha_comentario_has_ha_keyworkd_ha_keyworkd1_idx` (`ha_keyworkd_id` ASC),
  INDEX `fk_ha_comentario_has_ha_keyworkd_ha_comentario1_idx` (`fb_comentario_id` ASC),
  CONSTRAINT `fk_ha_comentario_has_ha_keyworkd_ha_comentario1`
    FOREIGN KEY (`fb_comentario_id`)
    REFERENCES `halimber`.`fb_comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_comentario_has_ha_keyworkd_ha_keyworkd1`
    FOREIGN KEY (`ha_keyworkd_id`)
    REFERENCES `halimber`.`ha_keyworkd` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`ha_comercio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`ha_comercio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comercio` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_evento_has_ha_comercio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_evento_has_ha_comercio` (
  `fb_evento_id` INT NOT NULL,
  `ha_comercio_id` INT NOT NULL,
  PRIMARY KEY (`fb_evento_id`, `ha_comercio_id`),
  INDEX `fk_ha_evento_has_ha_comercio_ha_comercio1_idx` (`ha_comercio_id` ASC),
  INDEX `fk_ha_evento_has_ha_comercio_ha_evento1_idx` (`fb_evento_id` ASC),
  CONSTRAINT `fk_ha_evento_has_ha_comercio_ha_evento1`
    FOREIGN KEY (`fb_evento_id`)
    REFERENCES `halimber`.`fb_evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_evento_has_ha_comercio_ha_comercio1`
    FOREIGN KEY (`ha_comercio_id`)
    REFERENCES `halimber`.`ha_comercio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_evento_has_ha_marca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_evento_has_ha_marca` (
  `fb_evento_id` INT NOT NULL,
  `ha_marca_id` INT NOT NULL,
  PRIMARY KEY (`fb_evento_id`, `ha_marca_id`),
  INDEX `fk_ha_evento_has_ha_marca_ha_marca1_idx` (`ha_marca_id` ASC),
  INDEX `fk_ha_evento_has_ha_marca_ha_evento1_idx` (`fb_evento_id` ASC),
  CONSTRAINT `fk_ha_evento_has_ha_marca_ha_evento1`
    FOREIGN KEY (`fb_evento_id`)
    REFERENCES `halimber`.`fb_evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_evento_has_ha_marca_ha_marca1`
    FOREIGN KEY (`ha_marca_id`)
    REFERENCES `halimber`.`ha_marca` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_evento_has_ha_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_evento_has_ha_producto` (
  `fb_evento_id` INT NOT NULL,
  `ha_producto_id` INT NOT NULL,
  PRIMARY KEY (`fb_evento_id`, `ha_producto_id`),
  INDEX `fk_ha_evento_has_ha_producto_ha_producto1_idx` (`ha_producto_id` ASC),
  INDEX `fk_ha_evento_has_ha_producto_ha_evento1_idx` (`fb_evento_id` ASC),
  CONSTRAINT `fk_ha_evento_has_ha_producto_ha_evento1`
    FOREIGN KEY (`fb_evento_id`)
    REFERENCES `halimber`.`fb_evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_evento_has_ha_producto_ha_producto1`
    FOREIGN KEY (`ha_producto_id`)
    REFERENCES `halimber`.`ha_producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_evento_has_ha_keyworkd`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_evento_has_ha_keyworkd` (
  `fb_evento_id` INT NOT NULL,
  `ha_keyworkd_id` INT NOT NULL,
  PRIMARY KEY (`fb_evento_id`, `ha_keyworkd_id`),
  INDEX `fk_ha_evento_has_ha_keyworkd_ha_keyworkd1_idx` (`ha_keyworkd_id` ASC),
  INDEX `fk_ha_evento_has_ha_keyworkd_ha_evento1_idx` (`fb_evento_id` ASC),
  CONSTRAINT `fk_ha_evento_has_ha_keyworkd_ha_evento1`
    FOREIGN KEY (`fb_evento_id`)
    REFERENCES `halimber`.`fb_evento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ha_evento_has_ha_keyworkd_ha_keyworkd1`
    FOREIGN KEY (`ha_keyworkd_id`)
    REFERENCES `halimber`.`ha_keyworkd` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`fb_comentario_has_ha_comercio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`fb_comentario_has_ha_comercio` (
  `fb_comentario_id` INT NOT NULL,
  `ha_comercio_id` INT NOT NULL,
  PRIMARY KEY (`fb_comentario_id`, `ha_comercio_id`),
  INDEX `fk_fb_comentario_has_ha_comercio_ha_comercio1_idx` (`ha_comercio_id` ASC),
  INDEX `fk_fb_comentario_has_ha_comercio_fb_comentario1_idx` (`fb_comentario_id` ASC),
  CONSTRAINT `fk_fb_comentario_has_ha_comercio_fb_comentario1`
    FOREIGN KEY (`fb_comentario_id`)
    REFERENCES `halimber`.`fb_comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fb_comentario_has_ha_comercio_ha_comercio1`
    FOREIGN KEY (`ha_comercio_id`)
    REFERENCES `halimber`.`ha_comercio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`tw_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`tw_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `screen_name` VARCHAR(255) NULL,
  `location` VARCHAR(255) NULL,
  `descripcion` TEXT NULL,
  `url` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `halimber`.`tw_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `halimber`.`tw_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tw_usuario_id` INT NOT NULL,
  `tw_id` FLOAT NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `source` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tw_status_tw_usuario1_idx` (`tw_usuario_id` ASC),
  CONSTRAINT `fk_tw_status_tw_usuario1`
    FOREIGN KEY (`tw_usuario_id`)
    REFERENCES `halimber`.`tw_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
