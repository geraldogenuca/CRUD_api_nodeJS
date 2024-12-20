-- MySQL Workbench Synchronization
-- Generated: 2024-12-20 18:56
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
CHANGE COLUMN `id_images` `id_image` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `image_path` `image_path` VARCHAR(45) NOT NULL ;

ALTER TABLE `sales_api`.`products` 
COLLATE = utf8_unicode_ci ,
CHANGE COLUMN `id_products` `id_product` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `name_products` `name_product` VARCHAR(150) NOT NULL ,
CHANGE COLUMN `price_products` `price_product` DOUBLE NOT NULL ,
CHANGE COLUMN `description_products` `description_product` VARCHAR(255) NULL DEFAULT NULL ;

ALTER TABLE `sales_api`.`categories` 
COLLATE = utf8_unicode_ci ,
CHANGE COLUMN `name_category` `name_category` VARCHAR(100) NOT NULL ;

ALTER TABLE `sales_api`.`images` 
ADD CONSTRAINT `fk_images_categories1`
  FOREIGN KEY (`id_category`)
  REFERENCES `sales_api`.`categories` (`id_category`)
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
