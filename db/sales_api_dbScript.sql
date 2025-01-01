-- MySQL Workbench Synchronization
-- Generated: 2025-01-01 15:01
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
  `phone_1` VARCHAR(45) NOT NULL,
  `phone_2` VARCHAR(45) NULL DEFAULT NULL,
  `id_address` INT(11) NOT NULL,
  `number_residence` SMALLINT(5) NULL DEFAULT NULL,
  `complement` VARCHAR(45) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_costumer`),
  UNIQUE INDEX `email_costumer_UNIQUE` (`email_costumer` ASC) VISIBLE,
  INDEX `fk_costumers_addresses1_idx` (`id_address` ASC) VISIBLE,
  CONSTRAINT `fk_costumers_addresses1`
    FOREIGN KEY (`id_address`)
    REFERENCES `sales_api`.`address` (`id_address`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`location` (
  `id_location` INT(11) NOT NULL AUTO_INCREMENT,
  `name_city` VARCHAR(100) NOT NULL,
  `state_initials` VARCHAR(10) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_location`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`address` (
  `id_address` INT(11) NOT NULL AUTO_INCREMENT,
  `id_location` INT(11) NOT NULL,
  `name_street` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id_address`),
  INDEX `fk_addresses_location1_idx` (`id_location` ASC) VISIBLE,
  CONSTRAINT `fk_addresses_location1`
    FOREIGN KEY (`id_location`)
    REFERENCES `sales_api`.`location` (`id_location`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`products` (
  `id_product` INT(11) NOT NULL AUTO_INCREMENT,
  `id_category` INT(11) NOT NULL,
  `name_product` VARCHAR(150) NOT NULL,
  `price_product` FLOAT(5,2) NOT NULL,
  `description_product` VARCHAR(45) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_product`),
  INDEX `fk_products_categories1_idx` (`id_category` ASC) VISIBLE,
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

CREATE TABLE IF NOT EXISTS `sales_api`.`images_products` (
  `id_image` INT(11) NOT NULL AUTO_INCREMENT,
  `id_product` INT(11) NOT NULL,
  `path_image` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id_image`),
  INDEX `fk_img_products_products1_idx` (`id_product` ASC) VISIBLE,
  CONSTRAINT `fk_img_products_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `sales_api`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
