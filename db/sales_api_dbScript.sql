-- MySQL Workbench Synchronization
-- Generated: 2024-12-30 14:11
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Administrator

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `sales_api` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;

CREATE TABLE IF NOT EXISTS `sales_api`.`costumers` (
  `id_costumer` INT(11) NOT NULL AUTO_INCREMENT,
  `name_costumer` VARCHAR(150) NULL DEFAULT NULL,
  `cpf_costumer` VARCHAR(11) NOT NULL,
  `email_costumer` VARCHAR(80) NOT NULL,
  `password_costumer` VARCHAR(200) NOT NULL,
  `id_street` INT(11) NOT NULL,
  `phone_1` VARCHAR(45) NOT NULL,
  `phone_2` VARCHAR(45) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_costumer`),
  UNIQUE INDEX `email_costumer_UNIQUE` (`email_costumer` ASC) VISIBLE,
  INDEX `fk_costumers_streets1_idx` (`id_street` ASC) VISIBLE,
  CONSTRAINT `fk_costumers_streets1`
    FOREIGN KEY (`id_street`)
    REFERENCES `sales_api`.`addresses` (`id_address`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`cities` (
  `id_city` INT(11) NOT NULL,
  `id_country` INT(11) NOT NULL,
  `name_city` VARCHAR(100) NOT NULL,
  `state_initials` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id_city`),
  INDEX `fk_cities_countries_idx` (`id_country` ASC) VISIBLE,
  CONSTRAINT `fk_cities_countries`
    FOREIGN KEY (`id_country`)
    REFERENCES `sales_api`.`countries` (`id_country`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`addresses` (
  `id_address` INT(11) NOT NULL AUTO_INCREMENT,
  `id_city` INT(11) NOT NULL,
  `name_street` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(8) NOT NULL,
  `n_residence` SMALLINT(5) NOT NULL,
  `complement` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_address`),
  INDEX `fk_streets_cities1_idx` (`id_city` ASC) VISIBLE,
  CONSTRAINT `fk_streets_cities1`
    FOREIGN KEY (`id_city`)
    REFERENCES `sales_api`.`cities` (`id_city`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`countries` (
  `id_country` INT(11) NOT NULL AUTO_INCREMENT,
  `name_country` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id_country`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`products` (
  `id_product` INT(11) NOT NULL AUTO_INCREMENT,
  `id_category` INT(11) NOT NULL,
  `id_img` INT(11) NOT NULL,
  `name_product` VARCHAR(150) NOT NULL,
  `price_product` FLOAT(5,2) NOT NULL,
  `description_product` VARCHAR(45) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_product`),
  INDEX `fk_products_img_products1_idx` (`id_img` ASC) VISIBLE,
  INDEX `fk_products_categories1_idx` (`id_category` ASC) VISIBLE,
  CONSTRAINT `fk_products_img_products1`
    FOREIGN KEY (`id_img`)
    REFERENCES `sales_api`.`img_products` (`id_img`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`id_category`)
    REFERENCES `sales_api`.`categories` (`id_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`categories` (
  `id_category` INT(11) NOT NULL AUTO_INCREMENT,
  `name_category` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`img_products` (
  `id_img` INT(11) NOT NULL,
  `path_img` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id_img`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`orders` (
  `id_order` INT(11) NOT NULL AUTO_INCREMENT,
  `id_costumer` INT(11) NOT NULL,
  `id_product` INT(11) NOT NULL,
  `id_employee` INT(11) NOT NULL,
  `quantity_product` VARCHAR(45) NOT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_order`),
  INDEX `fk_orders_costumers1_idx` (`id_costumer` ASC) VISIBLE,
  INDEX `fk_orders_products1_idx` (`id_product` ASC) VISIBLE,
  INDEX `fk_orders_employees1_idx` (`id_employee` ASC) VISIBLE,
  CONSTRAINT `fk_orders_costumers1`
    FOREIGN KEY (`id_costumer`)
    REFERENCES `sales_api`.`costumers` (`id_costumer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `sales_api`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_employees1`
    FOREIGN KEY (`id_employee`)
    REFERENCES `sales_api`.`employees` (`id_employee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`employees` (
  `id_employee` INT(11) NOT NULL AUTO_INCREMENT,
  `name_employee` VARCHAR(150) NOT NULL,
  `email_employee` VARCHAR(80) NULL DEFAULT NULL,
  `cpf_employee` VARCHAR(11) NOT NULL,
  `password_employee` VARCHAR(255) NOT NULL,
  `phone_employee` VARCHAR(11) NULL DEFAULT NULL,
  `function_employee` VARCHAR(100) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_employee`),
  UNIQUE INDEX `cpf_employee_UNIQUE` (`cpf_employee` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
