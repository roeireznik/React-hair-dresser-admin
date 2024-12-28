const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

const conn = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 10
})
conn.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/appointments", (req,res) => {
   var sql = 'SELECT * FROM appointments';

   conn.query(sql, (err, results) => {
      res.send(results);
   })
});

app.get("/customers", (req,res) => {
   var sql = 'SELECT * FROM customers';

   conn.query(sql, (err, results) => {
      res.send(results);
   })
});

app.get("/hairdressers", (req,res) => {
   var sql = 'SELECT * FROM hairdressers';

   conn.query(sql, (err, results) => {
      res.send(results);
   })
});

app.post('/appointments/add', (req,res) => {
   console.log(req.body)
   var appointment = req.body
   var keyAppintment = '';
   var valueAppintment = '';
   for (key in appointment) {
      keyAppintment += `${key},`
      valueAppintment += `"${appointment[key]}",`
   }

   keyAppintment = keyAppintment.slice(0, -1);
   valueAppintment = valueAppintment.slice(0, -1);
   var sql = `INSERT INTO appointments (${keyAppintment}) VALUES (${valueAppintment})`;
   conn.query(sql, (err, results) => {
      if(err) {
         console.log(err)
      }else {
         res.send(`{"status":"added","id":${results.insertId}}`)
      }
   })
})

app.put('/appointments/edit', (req,res) => {
   var appointment = req.body[0]
      var sql = 'UPDATE appointments SET '

   for (key in appointment) {
      sql += `${key} = "${appointment[key]}",`
   }
   sql = sql.slice(0, -1);
   sql += ` WHERE id = ${req.body[1]}`

   conn.query(sql, (err, results) => {
      if(err) {
         console.log(err)
      }else {
         res.send(`{"status":"edited","id":${results.insertId}}`)
      }
   })
})

app.delete('/appointments/delete/:id', (req,res) => {
   var sql = `DELETE FROM appointments WHERE id = ${req.params.id}`
   conn.query(sql, (err, results) => {
      if(err) {
         console.log(err)
      }else {
         res.send('{"status":"deleted"}')
      }

   })
})

app.listen(3001, () => console.log("Listening to 3001"));