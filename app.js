const express = require('express');
const mysql = require('mysql');
var path = require("path");

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tradingGame'
});

const C_PORT = "8080"; 

// Connect to db
db.connect((err) => {
    if(err){ throw err; }
    console.log('MySql Connected...');
});

const app = express();
app.use(express.json({ limit: '1000kb' }));
app.use(express.static(__dirname+'/public'));

const router = express.Router();
app.use(router);

// game page interface
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Create DB
router.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE tradingGame';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create items table
router.get('/createItemsTable', (req, res) => {
    let sql = 'CREATE TABLE items(id int, item VARCHAR(255), description VARCHAR(255), PRIMARY KEY(id));';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table created...');
    });
});

// CREATE TABLE turn_bonus_item(turn int NOT NULL, item VARCHAR(10) NOT NULL, PRIMARY KEY(turn));
// CREATE TABLE turn_bonus_alef(turn int NOT NULL, bonus int NOT NULL, PRIMARY KEY(turn));
// CREATE TABLE turn_bonus_lamed(turn int NOT NULL, bonus int NOT NULL, PRIMARY KEY(turn));
// CREATE TABLE turn_bonus_samech(turn int NOT NULL, bonus int NOT NULL, PRIMARY KEY(turn));

// Create turn trades table
router.get('/createTurnTradesTable', (req, res) => {
    let sql = 'CREATE TABLE turn_trades(turn int NOT NULL, ' +
                'item varchar(10) NOT NULL, ' +
                'alef_bonus int NOT NULL, ' +
                'lamed_bonus int NOT NULL, ' +
                'samech_bonus int NOT NULL, ' +
                'PRIMARY KEY(turn));';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Turn trades table created...');
    });
});

// Populate data in turn trades table
router.get('/populateTurnTrades', (req, res) => {
    let sql = "INSERT INTO turn_trades(turn, item, alef_bonus, lamed_bonus, samech_bonus) VALUES " +
	            "(1, 'salt', 0, 4, 8), " +
            	"(2, 'gems', 8, 0, 4), " +
	            "(3, 'wool', 4, 8, 0), " +
	            "(4, 'oil', 0, 4, 8), " +
	            "(5, 'spices', 8, 0, 4), " +
	            "(6, 'furs', 4, 8, 0), " +
	            "(7, 'jade', 0, 4, 8), " +
	            "(8, 'silk', 8, 0, 4), " +
	            "(9, 'salt', 4, 8, 0), " +
	            "(10, 'gems', 0, 4, 8), " +
	            "(11, 'wool', 8, 0, 4), " +
	            "(12, 'oil', 4, 8, 0), " +
 	            "(13, 'spices', 0, 4, 8), " +
	            "(14, 'furs', 8, 0, 4), " +
	            "(15, 'jade', 4, 8, 0), " +
	            "(16, 'silk', 0, 4, 8), " +
	            "(17, 'salt', 8, 0, 4), " +
	            "(18, 'gems', 4, 8, 0), " +
	            "(19, 'wool', 0, 4, 8), " +
	            "(20, 'oil', 8, 0, 4), " +
	            "(21, 'spices', 4, 8, 0), " +
	            "(22, 'furs', 0, 4, 8), " +
	            "(23, 'jade', 8, 0, 4), " +
	            "(24, 'silk', 4, 8, 0);";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table data populated...');
    });
});

// create rumors table
router.get('/createRumorsTable', (req, res) => {
    let sql = 'CREATE TABLE rumors(turn int NOT NULL, rumor VARCHAR(255), PRIMARY KEY(turn));';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Rumors table created...');
    });
});

// populate rumors table
router.get('/populateRumorsTable', (req, res) => {
    let sql = "INSERT INTO rumors(turn, rumor) VALUES " +
        "(1, 'I have heard some will pay a lot for salt.'), " +
        "(2, 'So many people are seeking gems in this place.'), " +
        "(3, 'Many sheep have been killed, I wonder if wool is in demand.'), " +
        "(4, 'It seems there is an oil shortage in a near by town.'), " +
        "(5, 'Have you tried the food here? It needs some spices I think.'), " +
        "(6, 'The weather has been getting colder - we should sell furs.'), " +
        "(7, 'I have heard some will pay a lot for jade.'), " +
        "(8, 'I have heard the royal family seeks silk. Which buyer has connections?'), " +
        "(9, 'Shipments from the sea have been halted - salt might be a good idea.'), " +
        "(10, 'It seems no one here is selling gems. I wonder what the demand is.'), " +
        "(11, 'We have the finest wool - I bet we can find a buyer.'), " +
        "(12, 'The temple seeks oil. I wonder which buyer has connections.'), " +
        "(13, 'The last shipment of spices was piliaged before making it to market.'), " +
        "(14, 'Our exotic furs should get a good price today.'), " +
        "(15, 'Everyone seems to be wearing jade - it seems they like it here.'), " +
        "(16, 'I have heard arrows cannot penitrate through silk.'), " +
        "(17, 'All the food here is bland. I think they need to add salt.'), " +
        "(18, 'These blue gems are just exquisit - do you agree?'), " +
        "(19, 'The market fire detroyed many tents. Maybe selling wool is good?'), " +
        "(20, 'Oil prices are so high, there must be a shortage.'), " +
        "(21, 'A good trade should spice up our business today.'), " +
        "(22, 'It seems the wealthy are wearing furs in this place.'), " +
        "(23, 'I have heard jade brings good luck.'), " +
        "(24, 'People have said the new silk underwear will reduce chafing.');";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Rumors table data populated...');
    });
});



// Create trade history table
router.get('/createTradeHistoryTable', (req, res) => {
    let sql = 'CREATE TABLE trade_history(turn int NOT NULL, trader_name VARCHAR(20), ' +
                'item VARCHAR(20), sell_price_per_item int,num_items_traded int,PRIMARY KEY(turn));';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('TradeHistory table created...');
    });
});

// Insert into trade history table
router.get('/addToTradeHistory/:currentTurn&:traderName&:item&:sellPrice&:numItemsTraded', (req, res) => {
    let post = {turn:req.params.currentTurn, trader_name:req.params.traderName, item:req.params.item, 
                sell_price_per_item:req.params.sellPrice, num_items_traded:req.params.numItemsTraded};
    let sql = 'INSERT INTO trade_history SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log("Trade History Event Added - Affected Rows: " + result.affectedRows);
        res.send(result);
    });
});

// Populate data in items table
router.get('/populateItemsTable', (req, res) => {
    let sql = "INSERT INTO items(id,item,description) VALUES" + 
        "(100, 'salt', 'Important for livestock, food preservation, and seasoning.')," +
        "(200, 'oil', 'Used as lamp fuel, cooking, soap making, and for healing powers.')," +
        "(300, 'spices', 'Added to mask the flavour of bland and not-so-fresh food.')," +
        "(400, 'gems', 'Desired for their beauty, and for ornamentation.')," +
        "(500, 'wool', 'Used for clothing, bags, carpets, and saddle blankets.')," +
        "(600, 'furs', 'Used for footwear, clothes, saddles and harnesses, light armor.')," +
        "(700, 'jade', 'A durable material used for tools, sculptures, and jewelry.')," +
        "(800, 'silk', 'Used for musical instruments, bowstrings, light armor, and clothing.');";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table data populated...');
    });
});

// Populate player item table
router.get('/populatePlayerItemsTable', (req, res) => {
    let sql = 'INSERT INTO player_items(id,qty) VALUES' + 
        '(100, 20),(200, 20),(300, 20),(400, 20),' +
        '(500, 20),(600, 20),(700, 20),(800, 20);';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Player Items table created...');
    });
});

// Create player item table
router.get('/createPlayerItemsTable', (req, res) => {
    let sql = 'CREATE TABLE player_items ( id int, qty SMALLINT, PRIMARY KEY(id) );';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Player Items table created...');
    });
});

// drops a specified table
router.get('/deleteTable/:tableName', (req, res) => {
    let sql = `DROP TABLE ${req.params.tableName}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${req.params.tableName} table deleted.`);
    });
});

// removes all rows from a specified table
router.get('/purgeTable/:tableName', (req, res) => {
    let sql = `DELETE FROM ${req.params.tableName}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${req.params.tableName} table purged.`);
    });
});

// Insert item
router.get('/addItem/:item', (req, res) => {
    let post = {item:req.params.item};
    let sql = 'INSERT INTO items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('1 item added...');
    });
});

// Insert player item
router.get('/addPlayerItem/:item&:quantity', (req, res) => {
    let post = {item:req.params.item, qty:req.params.quantity};
    let sql = 'INSERT INTO player_items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log("Item Added: " + result);
        res.send('1 item added...');
    });
});

// Select all player items helper
const selectAllPlayerItems = () => {
    //console.log(`select all items from player_items with item descriptions from items table.`);
    return new Promise((resolve, reject) => {
        db.query(`SELECT pi.id, i.item, pi.qty, i.description FROM player_items pi ` +
                `LEFT JOIN items i ON pi.id = i.id GROUP BY pi.id;`
        , (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
 };

// Select all player items
router.get('/getAllPlayerItems', async (req, res) => {
    try {
        const results = await selectAllPlayerItems();
        res.status(200).json({elements : results});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// select all items helper
const selectAllItems = (tableName) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName}`, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
 };

// Select all items
router.get('/getTableData/:tableName', async (req, res) => {
    try {
        const results = await selectAllItems(req.params.tableName);
        res.status(200).json({elements : results});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Select single item
router.get('/getItem/:tableName/:id', (req, res) => {
    let sql = `SELECT * FROM ${req.params.tableName} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Item ${req.params.id} fetched from ${req.params.tableName}`);
    });
});

// Delete single item
router.get('/deleteItem/:tableName/:id', (req, res) => {
    let sql = `DELETE FROM ${req.params.tableName} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Item ${req.params.id} deleted from ${req.params.tableName}`);
    });
});

app.listen(C_PORT, () => {
    console.log(`Server started on port ${C_PORT}`);
});