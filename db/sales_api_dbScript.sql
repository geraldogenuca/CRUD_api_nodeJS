-- MySQL Workbench Synchronization
-- Generated: 2024-12-21 06:48
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Administrator

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER SCHEMA `sales_api`  DEFAULT COLLATE utf8_unicode_ci ;

ALTER TABLE `sales_api`.`images` 
DROP FOREIGN KEY `fk_images_categories1`;

ALTER TABLE `sales_api`.`products` 
DROP FOREIGN KEY `fk_products_categories`;

ALTER TABLE `sales_api`.`images` 
COLLATE = utf8_unicode_ci ,
DROP COLUMN `id_category`,
ADD COLUMN `id_product` INT(11) NOT NULL AFTER `id_image`,
CHANGE COLUMN `image_path` `image_path` VARCHAR(500) NOT NULL ,
ADD INDEX `fk_images_products1_idx` (`id_product` ASC) VISIBLE,
DROP INDEX `fk_images_categories1_idx` ;
;

ALTER TABLE `sales_api`.`products` 
COLLATE = utf8_unicode_ci ,
CHANGE COLUMN `name_product` `name_product` VARCHAR(150) NOT NULL ,
CHANGE COLUMN `description_product` `description_product` VARCHAR(255) NULL DEFAULT NULL ;

ALTER TABLE `sales_api`.`categories` 
COLLATE = utf8_unicode_ci ,
CHANGE COLUMN `name_category` `name_category` VARCHAR(100) NOT NULL ;

CREATE TABLE IF NOT EXISTS `sales_api`.`orders` (
  `id_order` INT(11) NOT NULL AUTO_INCREMENT,
  `id_product` INT(11) NOT NULL,
  `quantity_order` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`id_order`),
  INDEX `fk_orders_products1_idx` (`id_product` ASC) VISIBLE,
  CONSTRAINT `fk_orders_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `sales_api`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `sales_api`.`images` 
ADD CONSTRAINT `fk_images_products1`
  FOREIGN KEY (`id_product`)
  REFERENCES `sales_api`.`products` (`id_product`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `sales_api`.`products` 
ADD CONSTRAINT `fk_products_categories`
  FOREIGN KEY (`id_category`)
  REFERENCES `sales_api`.`categories` (`id_category`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
