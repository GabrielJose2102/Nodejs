//importando mongoose driver conector de la BD
const mongoose = require('mongoose');

//importando la llave de la BD
const {database} = require('./keys');

// opciones para manejar el controlador de la base de datos mongodb
const options = {
    useNewUrlParser: true, // habilita el analizardo de url de mongodb
    useUnifiedTopology: true // habilita el nuevo mecanismo de administración de conexiones unificada
};

//metodo connect de mogoose para conectar la BD
//promesas con mesajes de ejecucion dependiendo si conecta la BD
mongoose.connect(database.uri, options).then(() => { // si la conexión es exitosa
    console.log('Conectado a MongoDB Atlas');
}).catch((error) => { // si la conexión falla
    console.error('Error al conectarse a MongoDB Atlas', error);
});