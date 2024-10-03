require('dotenv').config()
const express = require('express');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { main } = require('./aws');
const app = express();
const mysql = require('mysql');
var cors = require('cors')



const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const config = process.env.NODE_ENV === 'production' ?
  'http://15.236.38.180' : 'http://localhost:5173';
app.use(cors({
  origin: config
}));
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/clients/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM clients WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    console.log(results);
    if (results?.length > 0) {
      res.json({ data: results[0] });
    } else {
      res.status(404).json({ error: 'Not found', sucess: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', sucess: false });
  }
})
app.get("/clients", async (req, res) => {
  try {

    const results = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM clients', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    console.log(results);
    res.json({ results });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error', sucess: false });
  }
})
app.post('/clients/:id/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file);
    const { id } = req.params;
    const { originalname, buffer } = req.file;
    const file = await main(originalname, buffer);
    const insert = await new Promise((resolve, reject) => {
      pool.query(`INSERT INTO documents (bucket, filename, objectURL, Etag, \`key\`, client_id) VALUES (?, ?, ?, ?, ?, ?)`, 
      [file.Bucket, file.Key, file.Location, file.ETag, file.Key, id], 
      (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      });
    });
    res.json({ id, originalname });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error', sucess: false });
  }
})
module.exports = app;
