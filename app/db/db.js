const mongoose = require("mongoose");
const logger = require('../../utils/logger');

function connectToDb (tryNum = 0) {

    const maxTries = 30;

    tryNum++;
    console.info(`[SERVER] Try ${tryNum} to connect to DB...`);
    if (tryNum>maxTries) return console.error(`[SERVER] ${maxTries} tries to connect to MD failed!`);

    
    mongoose.connect("mongodb://localhost/tcsnodetest", {useNewUrlParser: true, useUnifiedTopology: true})
        .then(response => {

            // Report status to logs service
            console.info(`[SERVER] Connect to DB success!`);
            logger.info(`[SERVER] Connect to DB success!`);
        })
        .catch(error => {
            logger.error(`[SERVER] Connect to DB success!`);
            // Report status to error service
            console.error(`[SERVER] Error connect to DB!`);
            connectToDb(tryNum);
        })
}

module.exports = connectToDb;