'use strict';
const express = require('express');
const clients = require('../controllers/clientsController');
const app = express();


//Route category GET
app.get('/clients', clients.get);

//Route category POST
app.post('/clients', clients.save);

//Route category PUT
app.put('/clients', clients.edit);

//Route category DELETE
app.delete('/clients/:id', clients.delete);


module.exports = app;