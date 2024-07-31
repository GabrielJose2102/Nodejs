//importando mongoose driver conector de la BD
const mongoose = require('mongoose');

//importando la llave de la BD
const {database} = require('./keys');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

//metodo connect de mogoose para conectar la BD
//promesas con mesajes de ejecucion dependiendo si conecta la BD
mongoose.connect(database.uri, options).then(() => {
    console.log('Conectado a MongoDB Atlas');
}).catch((error) => {
    console.error('Error al conectarse a MongoDB Atlas', error);
});