-- MySQL Workbench Synchronization
-- Generated: 2024-12-20 18:03
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Administrator

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER SCHEMA `sales_api`  DEFAULT COLLATE utf8_unicode_ci ;

ALTER TABLE `sales_api`.`images` 
DROP FOREIGN KEY `fk_images_products1`;

ALTER TABLE `sales_api`.`images` 
COLLATE = utf8_unicode_ci ,
DROP COLUMN `id_products`,
ADD COLUMN `id_category` INT(11) NOT NULL AFTER `id_images`,
CHANGE COLUMN `image_path` `image_path` VARCHAR(45) NOT NULL ,
ADD INDEX `fk_images_categories1_idx` (`id_category` ASC) VISIBLE,
DROP INDEX `fk_images_products1_idx` ;
;

CREATE TABLE IF NOT EXISTS `sales_api`.`categories` (
  `id_category` INT(11) NOT NULL AUTO_INCREMENT,
  `name_category` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_category`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

ALTER TABLE `sales_api`.`images` 
ADD CONSTRAINT `fk_images_categories1`
  FOREIGN KEY (`id_category`)
  REFERENCES `sales_api`.`categories` (`id_category`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
