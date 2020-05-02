'use strict'; 
const mongoose = require('mongoose');


let Schema = mongoose.Schema;
//Clients models
let clientSchema = new Schema({
    name:{
        type:String,
        required: [true, 'The name is necessary'],
    },
    email: {
        type: String,
        required: [true, 'The email is necessary'],
        unique: [true, 'The email is unique'],
    },
    password: {
        type: String,
        required: [true, 'The password is necessary']
    },
    lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('clients', clientSchema);