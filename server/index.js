const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();
const result = dotenv.config();
const port = process.env.PORT ||  1337;

app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, '../public')));

//Controllers
const middleware = require('./controller/error.js');
const dbQuery = require('./controller/db/con.sql');
const nodeMail = require('./controller/email/nodeMailer.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$Treymysql74!',
  database: 'email'
})

try {
  db.connect()
  console.log('db established connection...');
} catch (error) {
  console.log('db connection error :', error);
}

app.post('/submit-form', (req, res) => {
  const {name,email,message} = req.body;
  var  myQ = db.query(dbQuery.postMessage,[name,email,message], (err, rows, fields) => {
        if (err) throw err;
  })  
        try {
          nodeMail.main(name,email,message)
          res.status(200).send({'success':{'good':'success'}})
        } catch (error) {
          console.log('ERROR',error)
          res.status(500).send({'fail':{'bad':'no good'}})
        }      
})

// error routes
app.use(middleware.notFound);
app.use(middleware.errorHandle);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`); 
});