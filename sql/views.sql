-- -----------------------------------------------------
-- view - turn_trades
-- -----------------------------------------------------
CREATE VIEW turn_trades (turn, item, alef_bonus, lamed_bonus, samech_bonus)
AS
    SELECT tbi.turn, tbi.item, tba.bonus AS alef_bonus, tbl.bonus AS lamed_bonus, tbs.bonus AS samech_bonus
    FROM turn_bonus_item tbi
    LEFT JOIN turn_bonus_alef tba
        ON tbi.turn = tba.item_turn
    LEFT JOIN turn_bonus_lamed tbl
        ON tbi.turn = tbl.item_turn
    LEFT JOIN turn_bonus_samech tbs
        ON tbi.turn = tbs.item_turn;

-- -----------------------------------------------------
-- view - player_items_list
-- -----------------------------------------------------
CREATE VIEW player_items_list (item_id, item, qty)
AS
    SELECT pi.item_id, i.item, pi.qty
    FROM player_items pi
    LEFT JOIN items i
        ON pi.item_id = i.id;








