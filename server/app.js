const express = require('express');
const path = require('path');
const body = require('body-parser');
//const app = express();
const mysql = require('mysql');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();

var httpsServer = https.createServer(credentials, app);

app.use(body());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

const db = mysql.createConnection({
    host: '172.25.240.1',
    user: 'Apiraj_Fighter',
    password: '084272',
    database: 'fighter_apiraj'
});
// show data
app.get('/data', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT * FROM fighter;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//Drop Down divisions
app.get('/dpdivisions', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT divisions AS dpdivi FROM `fighter` GROUP BY divisions;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//Divisions Count
app.get('/divisions', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT divisions AS divi, COUNT(*) AS total FROM `fighter` GROUP BY divisions;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//Drop Down SEX
app.get('/dpsex', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT sex AS dpsex FROM `fighter` GROUP BY sex;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//delete
app.put('/delete', function(req, res) {
    var sql = 'DELETE FROM fighter WHERE id = ?';
    db.query(sql,[req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//edit
app.put('/data', function(req, res) {
    var sql = 'UPDATE fighter SET full_name = ? , sex = ? , divisions = ? , boxer_fee = ?, wins = ? , loses = ? WHERE id = ?';
    db.query(sql,[req.body.full_name,req.body.sex,req.body.divisions,req.body.boxer_fee,req.body.wins,req.body.loses,req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//insert
app.post('/data', function(req, res){
    console.log(req.body);
    let data = {
        id:req.body.idkey,
        full_name:req.body.full_name,
        sex:req.body.sex,
        divisions:req.body.divisions,
        boxer_fee:req.body.boxer_fee,
        wins:req.body.wins,
        loses:req.body.loses
    };
    let sql = 'INSERT INTO fighter SET ?';
    db.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            console.log("ID is Primarykey!!!!!");
            console.log("Enter the id again..");
        }else{
            console.log(result);
        }
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});




//module.exports = app;
module.exports = httpsServer;
