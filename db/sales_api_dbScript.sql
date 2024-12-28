-- MySQL Workbench Synchronization
-- Generated: 2024-12-28 12:52
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Administrator

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `sales_api` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;

CREATE TABLE IF NOT EXISTS `sales_api`.`images` (
  `id_image` INT(11) NOT NULL AUTO_INCREMENT,
  `id_product` INT(11) NOT NULL,
  `image_path` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id_image`),
  INDEX `fk_images_products1_idx` (`id_product` ASC) VISIBLE,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `sales_api`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`products` (
  `id_product` INT(11) NOT NULL AUTO_INCREMENT,
  `id_category` INT(11) NOT NULL,
  `name_product` VARCHAR(150) NOT NULL,
  `price_product` DOUBLE NOT NULL,
  `description_product` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  INDEX `fk_products_categories_idx` (`id_category` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`id_category`)
    REFERENCES `sales_api`.`categories` (`id_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`categories` (
  `id_category` INT(11) NOT NULL AUTO_INCREMENT,
  `name_category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`orders` (
  `id_order` INT(11) NOT NULL AUTO_INCREMENT,
  `id_costumer` INT(11) NOT NULL,
  `id_user` INT(11) NOT NULL,
  `id_product` INT(11) NOT NULL,
  `quantity_product` SMALLINT(6) NOT NULL,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_order`),
  INDEX `fk_orders_products1_idx` (`id_product` ASC) VISIBLE,
  INDEX `fk_orders_costumers1_idx` (`id_costumer` ASC) VISIBLE,
  INDEX `fk_orders_users1_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_orders_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `sales_api`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_costumers1`
    FOREIGN KEY (`id_costumer`)
    REFERENCES `sales_api`.`costumers` (`id_costumer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`id_user`)
    REFERENCES `sales_api`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`users` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `name_user` VARCHAR(150) NULL DEFAULT NULL,
  `email_user` VARCHAR(80) NOT NULL,
  `password_user` VARCHAR(180) NOT NULL,
  `cpf_user` CHAR(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `sales_api`.`costumers` (
  `id_costumer` INT(11) NOT NULL AUTO_INCREMENT,
  `name_costumer` VARCHAR(150) NULL DEFAULT NULL,
  `email_costumer` VARCHAR(100) NULL DEFAULT NULL,
  `cpf_costumer` VARCHAR(11) NOT NULL,
  `phone_costumer` VARCHAR(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_costumer`),
  UNIQUE INDEX `cpf_costumer_UNIQUE` (`cpf_costumer` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
