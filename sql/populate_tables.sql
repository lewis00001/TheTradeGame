-- -----------------------------------------------------
-- table - high_score
-- -----------------------------------------------------
INSERT INTO high_score(player_name, score) values
	('Lewis', 820),
    ('Mufleo', 810),
    ('Dasha', 795);

-- -----------------------------------------------------
-- table - items
-- -----------------------------------------------------
INSERT INTO items(id, item) VALUES
	(100, 'salt'),
	(200, 'oil'),
	(300, 'spices'),
	(400, 'gems'),
	(500, 'wool'),
	(600, 'furs'),
	(700, 'jade'),
	(800, 'silk');
    
-- -----------------------------------------------------
-- table - item_description
-- -----------------------------------------------------
INSERT INTO item_description(id, description, item_id) VALUES
	(1, 'Important for livestock, food preservation, and seasoning.', 100),
	(2, 'Used as lamp fuel, cooking, soap making, and for healing powers.', 200),
	(3, 'Added to mask the flavour of bland and not-so-fresh food.', 300),
	(4, 'Desired for their beauty, and for ornamentation.', 400),
	(5, 'Used for clothing, bags, carpets, and saddle blankets.', 500),
	(6, 'Used for footwear, clothes, saddles and harnesses, light armor.', 600),
	(7, 'A durable material used for tools, sculptures, and jewelry.', 700),
	(8, 'Used for musical instruments, bowstrings, light armor, and clothing.', 800);

-- -----------------------------------------------------
-- table - player_items 
-- -----------------------------------------------------
INSERT INTO player_items(id, qty, item_id) VALUES
	(1, 20, 100),
    (2, 20, 200),
    (3, 20, 300),
    (4, 20, 400),
	(5, 20, 500),
    (6, 20, 600),
    (7, 20, 700),
    (8, 20, 800);

-- -----------------------------------------------------
-- table - rumors
-- -----------------------------------------------------
INSERT INTO rumors(turn, rumor) VALUES
	(1, 'I have heard some will pay a lot for salt.'),
	(2, 'So many people are seeking gems in this place.'),
	(3, 'Many sheep have been killed, I wonder if wool is in demand.'),
	(4, 'It seems there is an oil shortage in a near by town.'),
	(5, 'Have you tried the food here? It needs some spices I think.'),
	(6, 'The weather has been getting colder - we should sell furs.'),
	(7, 'I have heard some will pay a lot for jade.'),
	(8, 'I have heard the royal family seeks silk. Which buyer has connections?'),
	(9, 'Shipments from the sea have been halted - salt might be a good idea.'),
	(10, 'It seems no one here is selling gems. I wonder what the demand is.'),
	(11, 'We have the finest wool - I bet we can find a buyer.'),
	(12, 'The temple seeks oil. I wonder which buyer has connections.'),
	(13, 'The last shipment of spices was piliaged before making it to market.'),
	(14, 'Our exotic furs should get a good price today.'),
	(15, 'Everyone seems to be wearing jade - it seems they like it here.'),
	(16, 'I have heard arrows cannot penitrate through silk.'),
	(17, 'All the food here is bland. I think they need to add salt.'),
	(18, 'These blue gems are just exquisit - do you agree?'),
	(19, 'The market fire detroyed many tents. Maybe selling wool is good?'),
	(20, 'Oil prices are so high, there must be a shortage.'),
	(21, 'A good trade should spice up our business today.'),
	(22, 'It seems the wealthy are wearing furs in this place.'),
	(23, 'I have heard jade brings good luck.'),
	(24, 'People have said the new silk underwear will reduce chafing.');

-- -----------------------------------------------------
-- table - trade_history
-- -----------------------------------------------------
INSERT INTO trade_history(turn, trader_name, item, sell_price_per_item, num_items_traded) VALUES
	(1, 'Alef', 'salt', 5, 8),
    (2, 'Lamed', 'oil', 9, 10),
    (3, 'Samech', 'gems', 13, 4);
    
    -- -----------------------------------------------------
-- table - turn_bonus_items
-- -----------------------------------------------------
INSERT INTO turn_bonus_item(turn, item) VALUES
	(1, 'salt'),
	(2, 'gems'),
	(3, 'wool'),
	(4, 'oil'),
	(5, 'spices'),
	(6, 'furs'),
	(7, 'jade'),
	(8, 'silk'),
	(9, 'salt'),
	(10, 'gems'),
	(11, 'wool'),
	(12, 'oil'),
	(13, 'spices'),
	(14, 'furs'),
	(15, 'jade'),
	(16, 'silk'),
	(17, 'salt'),
	(18, 'gems'),
	(19, 'wool'),
	(20, 'oil'),
	(21, 'spices'),
	(22, 'furs'),
	(23, 'jade'),
	(24, 'silk');

-- -----------------------------------------------------
-- table - turn_bonus_alef
-- -----------------------------------------------------
INSERT INTO turn_bonus_alef(turn, bonus, item_turn) VALUES
	(1, 0, 1), 
	(2, 8, 2),
	(3, 4, 3),
	(4, 0, 4),
	(5, 8, 5),
	(6, 4, 6),
	(7, 0, 7),
	(8, 8, 8),
	(9, 4, 9),
	(10, 0, 10),
	(11, 8, 11),
	(12, 4, 12),
	(13, 0, 13),
	(14, 8, 14),
	(15, 4, 15),
	(16, 0, 16),
	(17, 8, 17),
	(18, 4, 18),
	(19, 0, 19),
	(20, 8, 20),
	(21, 4, 21),
	(22, 0, 22),
	(23, 8, 23),
	(24, 4, 24);

-- -----------------------------------------------------
-- table - turn_bonus_lamed
-- -----------------------------------------------------
INSERT INTO turn_bonus_lamed(turn, bonus, item_turn) VALUES
	(1, 4, 1),
	(2, 0, 2),
	(3, 8, 3),
	(4, 4, 4),
	(5, 0, 5),
	(6, 8, 6),
	(7, 4, 7),
	(8, 0, 8),
	(9, 8, 9),
	(10, 4, 10),
	(11, 0, 11),
	(12, 8, 12),
	(13, 4, 13),
	(14, 0, 14),
	(15, 8, 15),
	(16, 4, 16),
	(17, 0, 17),
	(18, 8, 18),
	(19, 4, 19),
	(20, 0, 20),
	(21, 8, 21),
	(22, 4, 22),
	(23, 0, 23),
	(24, 8, 24);
    
-- -----------------------------------------------------
-- table - turn_bonus_samech
-- -----------------------------------------------------
INSERT INTO turn_bonus_samech(turn, bonus, item_turn) VALUES
	(1, 8, 1),
	(2, 4, 2),
	(3, 0, 3),
	(4, 8, 4),
	(5, 4, 5),
	(6, 0, 6),
	(7, 8, 7),
	(8, 4, 8),
	(9, 0, 9),
	(10, 8, 10),
	(11, 4, 11),
	(12, 0, 12),
	(13, 8, 13),
	(14, 4, 14),
	(15, 0, 15),
	(16, 8, 16),
	(17, 4, 17),
	(18, 0, 18),
	(19, 8, 19),
	(20, 4, 20),
	(21, 0, 21),
	(22, 8, 22),
	(23, 4, 23),
	(24, 0, 24);

-- -----------------------------------------------------
-- table - traders
-- -----------------------------------------------------
INSERT INTO traders(trader_id, trader_name) VALUES
	(111, "Alef"),
    (222, "Lamed"),
    (333, "Samech");

-- -----------------------------------------------------
-- table - trader_image_links
-- -----------------------------------------------------
INSERT INTO trader_image_links(id, link, trader_id) VALUES
	(1, "./img/trader-1.jpg", 111),
    (2, "./img/trader-2.jpg", 222),
    (3, "./img/trader-3.jpg", 333);
 