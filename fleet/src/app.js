const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./db');
require('./routes')(app);

module.exports = app;
