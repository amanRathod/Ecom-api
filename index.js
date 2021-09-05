const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const Mongoose  = require('mongoose');
const ConntectDB = require('./config/database');

const app = express();

dotenv.config();

ConntectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', require('./routes'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})
