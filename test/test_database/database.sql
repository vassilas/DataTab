
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;


-- employees
-- ------------------------------------------------------------------------
CREATE TABLE `employees` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` varchar(100) DEFAULT NULL,
	`last_name` varchar(100) DEFAULT NULL,
	`phone_number` varchar(30), 
	`email` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- employees
-- ------------------------------------------------------------------------
CREATE TABLE `residence`(
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `country` varchar(100) DEFAULT NULL,
    `state` varchar(100) DEFAULT NULL,
    `city` varchar(100) DEFAULT NULL,
    `street` varchar(100) DEFAULT NULL,
    `zip_code` varchar(100) DEFAULT NULL,
    PRIMARY KEY(`id`)
)