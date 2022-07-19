const express = require('express');
const mysql = require('mysql');
var path = require("path");

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'trade_game'
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

router.get('/js/index.js',function(req,res){
    res.sendFile(path.join(__dirname + '/js/index.js')); 
});

// *************************************************************
// I moved/removed all of the create_table and populate_table
// endpoints because I was needing to update them too often
// and they were not really required for on-going gameplay. 
// Please see the:
// --- 'create_tables.sql'
// --- 'populate_tables.sql'
// --- 'views.sql
// files in the 'sql' folder to set the game up locally. 
// NOTE: The sql files are not to be run directly from the 
// folder. You will need to be logged into your mySQL database 
// before running the scripts. 
// *************************************************************

// Insert into trade history table
// *** used by updateTradeHistory()
// --------------------------------------------------
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

// removes all rows from a specified table
// *** used by purgeTradeHistory()
// --------------------------------------------------
router.get('/purgeTable/:tableName', (req, res) => {
    let sql = `DELETE FROM ${req.params.tableName}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${req.params.tableName} table purged.`);
    });
});


// getAllPlayerItems helper
const selectAllPlayerItems = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT item_id, item, qty FROM player_items_list;`
        , (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
 };

// Select all player items
// *** used by displayPlayerItems()
// --------------------------------------------------
router.get('/getAllPlayerItems', async (req, res) => {
    try {
        const results = await selectAllPlayerItems();
        res.status(200).json({elements : results});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// getTableData helper
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
// *** used by getTurnTrades()
// *** used by getRumors()
// *** used by displayTradeHistoryData()
// --------------------------------------------------
router.get('/getTableData/:tableName', async (req, res) => {
    try {
        const results = await selectAllItems(req.params.tableName);
        res.status(200).json({elements : results});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// getHighScore helper
const selectHighestScore = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT item_id, item, qty FROM player_items_list;`
        , (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
 };

// Select all player items
// *** used by displayHighScore()
// --------------------------------------------------
router.get('/getHighScore', async (req, res) => {
    try {
        const results = await selectHighestScore();
        res.status(200).json({elements : results});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// ******************
// other endpoints //
// ******************

// drops a specified table
router.get('/deleteTable/:tableName', (req, res) => {
    let sql = `DROP TABLE ${req.params.tableName}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${req.params.tableName} table deleted.`);
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

// Select single item
router.get('/getItem/:tableName/:id', (req, res) => {
    let sql = `SELECT * FROM ${req.params.tableName} WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Item ${req.params.id} fetched from ${req.params.tableName}`);
    });
});


// app function
app.listen(C_PORT, () => {
    console.log(`Server started on port ${C_PORT}`);
});