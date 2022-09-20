require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000 || process.env.PORT;

const {connectDb} = require('./database');
// console.log('this is connectdb: ', connectDb)
var router = require('./routes.js');

// set up middleware
app.use(express.json())
app.use(morgan('dev'))

// TODO: connect to client?


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})

// set up routes
app.use('/qa', router);

// connect database
connectDb();



