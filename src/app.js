const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan');
const cors = require('cors');
const dbConnection = require('./database/config')
const { Schema, model } = require('mongoose');
require('dotenv').config();

dbConnection();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes/auth'));

app.set('port', process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`App running at port: http://localhost:${port}`)
})

