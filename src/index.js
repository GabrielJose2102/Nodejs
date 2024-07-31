//importando express
const express = require('express');
//importando la configuracion del servidor
const config = require('./server/config.js');

//importando la configuracion y conexion de la BD
require('./database');

//pasando parametro de puerto a la configuracion de servidor para saber en que puerto arracara la app
const app = config(express());

//Ejecutando el servidor
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'));
});
