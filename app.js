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

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(express.json({ limit: '1000kb' }));

// game page interface
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE tradingGame';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create item table
app.get('/createItemTable', (req, res) => {
    let sql = 'CREATE TABLE items(id int AUTO_INCREMENT, Item VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table created...');
    });
});

// Create player item table
app.get('/createPlayerItemTable', (req, res) => {
    let sql = 'CREATE TABLE player_items(id int AUTO_INCREMENT, Item VARCHAR(255), Qty SMALLINT, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Player Items table created...');
    });
});

// drops a specified table
app.get('/deleteTable', (req, res) => {
    let tableName = "";
    let sql = `DROP TABLE ${tableName}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${tableName} table deleted.`);
    });
});

// Insert item
app.get('/addItem/:item', (req, res) => {
    let post = {item:req.params.item};
    let sql = 'INSERT INTO items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('1 item added...');
    });
});

// Insert player item
app.get('/addPlayerItem/:item&:qty', (req, res) => {
    let post = {Item:req.params.item, Qty:req.params.qty};
    let sql = 'INSERT INTO player_items SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log("Item Added: " + result);
        res.send('1 item added...');
    });
});

// Select all items
app.get('/getTableData/:tableName', (req, res) => {
    let sql = `SELECT * FROM ${req.params.tableName}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(`${req.params.tableName} data fetched...`);
        let obj = JSON.stringify(results);
        console.log(obj);
        return obj;
    });
});

// Select single item
app.get('/getItem/:id', (req, res) => {
    let sql = `SELECT * FROM items WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items fetched...');
    });
});

// Update item
app.get('/updateItem/:id', (req, res) => {
    let newTitle = 'Title';
    let sql = `UPDATE items SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Item updated...');
    });
});

// Delete item
app.get('/deleteItem/:id', (req, res) => {
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