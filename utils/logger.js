const winston = require('winston');


//loggers con winston

/* Nivel de Logs
    error:  0 //nivel mas alto e importante
    warn:   1
    info:   2
    verbose:3
    debug:  4
    silly:  5
*/
//incluir fecha en los logs en los formatos winston
const incluirFecha = winston.format((info)=>{
    info.message = `${new Date().toISOString()} ${info.message}`;
    return info;
})//

module.exports = winston.createLogger({
    transports:[
        new winston.transports.Console({
            level:'debug',//si pongo debug vere todos los logs por encima de debug, (verbose, info, warn, error)
            handleExceptions:true,
            format:winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level:'info',
            handleExceptions:true,
            format: winston.format.combine(
                incluirFecha(),
                winston.format.simple(),
            ), 
            maxsize: 5120000, //5mb tamaño maximo del archivo
            maxFiles: 5, // maximo 5 archivos, cuando el 5 se lleva se borra el archivo mas viejo y se crea uno nuevo(es decir rota los archivos logs)
            filename:`${__dirname}/../logs/logs-de-aplicacion.log`//nombre del archivo
        })
    ]
});


