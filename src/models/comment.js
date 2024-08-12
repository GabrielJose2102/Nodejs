const mongoose = require('mongoose'); //importamos mongoose
const { Schema, model } = mongoose; //extraemos la clase Schema
const ObjectId = Schema.ObjectId; //traemos el tipo de dato ObjectId del esquema para relacionar imagen y comentario

const CommentSchema = new Schema({ //instanciamos la clase Schema y le pasamos como parametro un objeto con los nombres de los campos y los tipos de datos
    image_id: { type: ObjectId },
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, default:Date.now }
});

CommentSchema.virtual('image')
    .set(function (image) {
        this._image = image;
    })
    .get(function () {
        return this._image;
    });


module.exports = model('Comment', CommentSchema); //se exporta el esquema y se usa la función model para convertirlo en un modelo que se puede ejecutar como consulta en la BD