-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema askdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema askdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `askdb` ;
USE `askdb` ;

-- -----------------------------------------------------
-- Table `askdb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `askdb`.`user` (
  `iduser` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `askdb`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `askdb`.`question` (
  `idquestion` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `text` LONGTEXT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idquestion`, `user_iduser`),
  INDEX `fk_question_user_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_question_user`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `askdb`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `askdb`.`answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `askdb`.`answer` (
  `idanswer` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `user_iduser` INT NOT NULL,
  `question_idquestion` INT NOT NULL,
  PRIMARY KEY (`idanswer`, `user_iduser`, `question_idquestion`),
  INDEX `fk_answer_user1_idx` (`user_iduser` ASC) VISIBLE,
  INDEX `fk_answer_question1_idx` (`question_idquestion` ASC) VISIBLE,
  CONSTRAINT `fk_answer_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `askdb`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answer_question1`
    FOREIGN KEY (`question_idquestion`)
    REFERENCES `askdb`.`question` (`idquestion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `askdb`.`keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `askdb`.`keyword` (
  `idkeyword` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `question_idquestion` INT NOT NULL,
  `question_user_iduser` INT NOT NULL,
  PRIMARY KEY (`idkeyword`, `question_idquestion`, `question_user_iduser`),
  INDEX `fk_keyword_question1_idx` (`question_idquestion` ASC, `question_user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_keyword_question1`
    FOREIGN KEY (`question_idquestion` , `question_user_iduser`)
    REFERENCES `askdb`.`question` (`idquestion` , `user_iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

