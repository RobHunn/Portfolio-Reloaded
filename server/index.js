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
const port = process.env.PORT ||  8080;

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

db.connect( (err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.post('/submit-form', (req, res) => {
  const {name,email,message} = req.body;
  db.query(dbQuery.postMessage,[name,email,message], (err, rows, fields) => {
        if (err) {
          console.log('query error: ', err)
          throw err;
        } 
  })
   nodeMail.main(name,email,message)
   .then((res)=>{funSend()})
        .catch((err)=>{
              console.log('nodeMailer error ',err)
              res.status(500).send({"status":{"message":"fail"}})
          })
   funSend = ()=>{res.status(200).send({"status":{"message":"success"}})}
})

// error routes
app.use(middleware.notFound);
app.use(middleware.errorHandle);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`); 
});
