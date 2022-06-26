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

// Create trade history table
router.get('/createTradeHistoryTable', (req, res) => {
    let sql = 'CREATE TABLE trade_history(id int NOT NULL AUTO_INCREMENT, trader_name VARCHAR(128), ' +
                'item VARCHAR(255), sell_price_per_item int,num_items_traded int,PRIMARY KEY(id));';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table created...');
    });
});

// Insert into trade history table
router.get('/addToTradeHistory/:traderName&:item&:sellPrice&:numItemsTraded', (req, res) => {
    let post = {trader_name:req.params.traderName, item:req.params.item, 
                sell_price_per_item:req.params.sellPrice, num_items_traded:req.params.numItemsTraded};
    let sql = 'INSERT INTO trade_history SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log("Trade History Event Added - Affected Rows: " + result.affectedRows);
        res.send(result);
    });
});

// // Select all player items helper
// const selectAllTradeHistory = () => {
//     console.log(`select all trade history events from the trade_history table`);
//     return new Promise((resolve, reject) => {
//         db.query(`SELECT pi.id, i.item, pi.qty, i.description FROM player_items pi ` +
//                 `LEFT JOIN items i ON pi.id = i.id GROUP BY pi.id;`
//         , (error, elements) => {
//             if (error) {
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
//  };

// // Select all player items
// router.get('/getAllPlayerItems', async (req, res) => {
//     try {
//         const results = await selectAllTradeHistory();
//         res.status(200).json({elements : results});
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

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
router.get('/deleteTable', (req, res) => {
    let tableName = "";
    let sql = `DROP TABLE ${tableName}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${tableName} table deleted.`);
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
    //console.log(`selectAllItems for ${tableName}`);
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