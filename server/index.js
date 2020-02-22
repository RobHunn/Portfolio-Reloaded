const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const app = express();
const result = dotenv.config();

//Controllers
const middleware = require('./controller/error.js');
const conn = require('./db/con.sql');

const port = process.env.PORT ||  1337;

app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use(express.static('public'));

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'xxxxx',
  password: 'xxxxx',
  database: 'email'
})


//connection.query(conn.getEmails, function (err, rows, fields) {
  //if (err) throw err
//for(i=0;i<rows.length;i++){
//console.log( rows[1])
//}
  
//})

app.post('/user', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});

app.post('/submit-form',urlencodedParser, (req, res) => {
  const {name,email,message} = req.body
connection.connect()
  connection.query(conn.postMessage,[name,email,message], function (err, rows, fields) {
  if (err) throw err
//for(i=0;i<rows.length;i++){
console.log( rows[1])
//}
  
})

  res.status(200).send({name:name,email:email,message:message});
  connection.end()
})


// error routes
app.use(middleware.notFound);
app.use(middleware.errorHandle);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`); 
});