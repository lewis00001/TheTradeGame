const express = require('express');
const mysql = require('mysql');
var path = require("path");

// Create connection
const db = mysql.createConnection({
    //connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tradingGame'
    //port: 8080
});

const C_PORT = "8080"; 

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
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

// Create item table
router.get('/createItemTable', (req, res) => {
    let sql = 'CREATE TABLE items(id int AUTO_INCREMENT, Item VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table created...');
    });
});

// Create player item table
router.get('/createPlayerItemTable', (req, res) => {
    let sql = 'CREATE TABLE player_items(id int AUTO_INCREMENT, Item VARCHAR(255), Qty SMALLINT, PRIMARY KEY(id))';
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
router.get('/addPlayerItem/:item&:qty', (req, res) => {
    let post = {Item:req.params.item, Qty:req.params.qty};
    let sql = 'INSERT INTO player_items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log("Item Added: " + result);
        res.send('1 item added...');
    });
});

const selectAllItems = (tableName) => {
    console.log(`selectAllItems for ${tableName}`);
    return new Promise((resolve, reject) => {
        console.log("calling promise");
        db.query(`SELECT * FROM ${tableName}`, (error, elements) => {
            console.log("executed query");
            if (error) {
                console.log("triggered error");
                return reject(error);
            }
            console.log("resolving promise");
            return resolve(elements);
        });
    });
 };

// Select all items
router.get('/getTableData/:tableName', async (req, res) => {
    try {
        console.log(`calling selectAllItems for ${req.params.tableName}`);
        const results = await selectAllItems(req.params.tableName);
        res.status(200).json({elements : results});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Select single item
router.get('/getItem/:id', (req, res) => {
    let sql = `SELECT * FROM items WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items fetched...');
    });
});

// Update item
router.get('/updateItem/:id', (req, res) => {
    let newTitle = 'Title';
    let sql = `UPDATE items SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Item updated...');
    });
});

// Delete item
router.get('/deleteItem/:id', (req, res) => {
    let sql = `DELETE FROM items WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Item deleted...');
    });
});

app.listen(C_PORT, () => {
    console.log(`Server started on port ${C_PORT}`);
});