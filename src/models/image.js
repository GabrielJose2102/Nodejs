const mogoose = require('mongoose'); //importamos mongoose
const { Schema } = mogoose; //extraemos la clase Schema
const path = require('path'); //path para extraer la ruta de donde esta el archivo

const ImageSchema = new Schema({ //instanciamos la clase Schema y le pasamos como parametro un objeto con los nombres de los campos y los tipos de datos
    title: { type: String },  
    description:{ type: String }, 
    filename: { type: String }, 
    views: { type: Number, default: 0 }, 
    likes: { type: Number, default: 0 }, 
    timestamp: { type: Date, default: Date.now } 
});

ImageSchema.virtual('uniqueId') //en el esquema se alojara de forma virtual un id unico que se usa como identificador de cada objeto creado
    .get(function () { //función que accede al valor
        return this.filename.replace(path.extname(this.filename), ''); //se extrae el nombre de la imagen que funcionara como el id del objeto
    }); 


module.exports = mogoose.model('Image', ImageSchema); //se exporta el esquema y se usa la función model para convertirlo en un modelo que se puede ejecutar como consulta en la BD