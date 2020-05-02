// Importaciones
const bodyParser=  require('body-parser');
const express   =  require("express");
const morgan    =  require('morgan');
const server    =  require('./app');
const cors      =  require("cors");
const logger    =  require('./utils/logger');

//Definicion de la aplciacion
const app = express();


//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// genera logs de las peticiones, si lo combinamos con morgan podemos guardar esos logs
app.use(morgan('short', {
    stream: {
        write : message => logger.info(message.trim()) // combinamos con logger
    }
}))

//Cors
app.use(cors());



//Route configuration
app.use(require('./app/routes/index'));


// Apertura del servidor
server(app);



