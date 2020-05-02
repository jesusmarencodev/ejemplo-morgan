'use strict';

const express = require('express');
const app = express();

//Route master
app.use(require('./clientesRoutes'));




module.exports = app;
