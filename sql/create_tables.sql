-- -----------------------------------------------------
-- DB - Schema trade_game
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trade_game` DEFAULT CHARACTER SET UTF8MB4;
USE `trade_game`;
-- -----------------------------------------------------
-- create - high_score
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. high_score(player_name VARCHAR(20) NOT NULL,
	score DOUBLE NOT NULL)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - items
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. items(id int, 
	item VARCHAR(16),
    PRIMARY KEY(id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - item_description
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. item_description(id int, 
    description VARCHAR(255),
    item_id int NOT NULL,
    PRIMARY KEY(id),
	INDEX `item_idx` (`id` ASC) VISIBLE,
	CONSTRAINT `fk_item`
		FOREIGN KEY (`item_id`)
		REFERENCES `trade_game`.`items` (`id`)
		ON DELETE NO ACTION
		ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - player_items 
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. player_items(id int, 
	qty int, 
    item_id int,
    PRIMARY KEY(id),
	INDEX `item_idx` (`id` ASC) VISIBLE,
	CONSTRAINT `fk_p_item`
		FOREIGN KEY (`item_id`)
		REFERENCES `trade_game`.`items` (`id`)
		ON DELETE NO ACTION
		ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - rumors
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. rumors(turn INT NOT NULL, 
	rumor VARCHAR(255), 
    PRIMARY KEY(turn))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - trade_history
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. trade_history(turn int NOT NULL, 
	trader_name VARCHAR(20), 
    item VARCHAR(20), 
    sell_price_per_item int,
    num_items_traded int,
    PRIMARY KEY(turn))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - turn_bonus_items
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. turn_bonus_item(turn int NOT NULL, 
	item VARCHAR(10) NOT NULL,
    PRIMARY KEY(turn))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - turn_bonus_alef
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. turn_bonus_alef(turn int NOT NULL, 
	bonus int NOT NULL,
	item_turn int NOT NULL,
    PRIMARY KEY(turn),
	INDEX `turn_idx` (`turn` ASC) VISIBLE,
	CONSTRAINT `fk_turn_a`
		FOREIGN KEY (`item_turn`)
		REFERENCES `trade_game`.`turn_bonus_item` (`turn`)
		ON DELETE NO ACTION
		ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - turn_bonus_lamed
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. turn_bonus_lamed(turn int NOT NULL, 
	bonus int NOT NULL,
	item_turn int NOT NULL,
    PRIMARY KEY(turn),
	INDEX `turn_idx` (`turn` ASC) VISIBLE,
	CONSTRAINT `fk_turn_l`
		FOREIGN KEY (`item_turn`)
		REFERENCES `trade_game`.`turn_bonus_item` (`turn`)
		ON DELETE NO ACTION
		ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - turn_bonus_samech
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. turn_bonus_samech(turn int NOT NULL, 
	bonus int NOT NULL, 
    item_turn int NOT NULL,
    PRIMARY KEY(turn),
	INDEX `turn_idx` (`turn` ASC) VISIBLE,
	CONSTRAINT `fk_turn_s`
		FOREIGN KEY (`item_turn`)
		REFERENCES `trade_game`.`turn_bonus_item` (`turn`)
		ON DELETE NO ACTION
		ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - trader_table
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. traders(trader_id int NOT NULL, 
	trader_name VARCHAR(10) NOT NULL,
    PRIMARY KEY(trader_id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- create - trader_image_links
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `trade_game`. trader_image_links(id int NOT NULL, 
	link VARCHAR(255) NOT NULL, 
    trader_id int NOT NULL,
    PRIMARY KEY(id),
	INDEX `trader_idx` (`id` ASC) VISIBLE,
	CONSTRAINT `fk_trader`
		FOREIGN KEY (`trader_id`)
		REFERENCES `trade_game`.`traders` (`trader_id`)
		ON DELETE NO ACTION
		ON UPDATE CASCADE)
ENGINE = InnoDB;