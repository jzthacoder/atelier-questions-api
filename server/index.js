const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000 || process.env.PORT;

const db = require('./database');
var router = require('./routes.js');

// set up middleware
app.use(express.json())
app.use(morgan('dev'))

// TODO: connect to client?


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})


