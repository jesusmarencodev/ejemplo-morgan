const connectToDb = require("./app/db/db");
const PORT     = process.env.PORT || 3000;
const logger = require('./utils/logger');

function servidor(app){
    app.listen(PORT, (err) => {
        if(err){
            console.log(`Failed to connect to [SERVER]`);
            logger.error(`Failed to connect to [SERVER]`);
        }else{
            // Conexión a base de datos (PROPUESTA_1)
            logger.info(`[SERVER] Listening on port ${PORT}`);
            connectToDb();
            console.info(`[SERVER] Listening on port ${PORT}...`);
        }
    });
}

module.exports = servidor;